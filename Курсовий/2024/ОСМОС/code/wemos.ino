#include <ESP8266WiFi.h>        //Стандартная библиотека
#include <PubSubClient.h>

// Определяем переменные
String _ssid     = "TP-Link_1F20";                       // Название WiFi
String _password = "60354341";                    // Пароль от WiFi 

const char *mqtt_server = "broker.hivemq.com"; // Имя сервера MQTT
const int mqtt_port =   1883; // Порт для подключения к серверу MQTT
const char *mqtt_user = "4d78899845734a858cdfc2e436f22b29.s1.eu.hivemq.cloud"; // Логи от сервер
const char *mqtt_pass = ""; // Пароль от сервера
int sum_led = 0;
int time_send = millis();

//вказуэмо входа датчиків
int SEC = 0;
int MIN = 0;
unsigned long timer;

const int motionSensor = D1;                                      // PIR датчик НАСОС
bool motionDetected = false ;//

const int motionSensor1 = D2;                                      // PIR датчик2 УРОВЕНЬ
bool motionDetected1 = false;//

const int motionSensor2 = D3;                                      // PIR датчик2 НИЗ ДАВЛЕНИЭ пермиата
bool motionDetected2 = false;//

const int motionSensor3 = D4;                                      // PIR датчик2 авария РКФ
bool motionDetected3 = false;//

String motor = "0" ;//
String yroven = "0" ;//
String presure = "0" ;//
String RKF = "0" ;//


bool skid = false ;//

//char OCMOCMS[6] = {'h', 'e', 'l', 'l', 'o'};

 

void callback(const MQTT::Publish& pub)
{
  Serial.print(pub.topic());   // выводим в сериал порт название топика
  Serial.print(" => ");
  Serial.print(pub.payload_string()); // выводим в сериал порт значение полученных данных
  
  String payload = pub.payload_string();
  
  if(String(pub.topic()) == "Led") // проверяем из нужного ли нам топика пришли данные 
  {
  int stled = payload.toInt(); // преобразуем полученные данные в тип integer
  /*if (stled == 1){
    digitalWrite(13, HIGH); 
  }else{digitalWrite(13, LOW); }
  digitalWrite(13,stled);*/  //  включаем или выключаем светодиод в зависимоти от полученных значений данных
 
  sum_led=sum_led+1;

  
  }
}







WiFiClient wclient;      
PubSubClient client(wclient, mqtt_server, mqtt_port);


void setup() {
  Serial.begin(115200); //устанавливаем скорость
  Serial.println("");


 pinMode(motionSensor, INPUT_PULLUP);                          // Внутренняя подтяжка PIR  INPUT_PULLUP
 pinMode(motionSensor1, INPUT_PULLUP);  
 pinMode(motionSensor2, INPUT_PULLUP);
 pinMode(motionSensor3, INPUT_PULLUP); 

    
 // pinMode(13, OUTPUT);
  
   // ----------------Подключение к WiFi-----------))
  WiFi.mode(WIFI_STA);                  
  WiFi.begin(_ssid.c_str(), _password.c_str());      //пробуем  подключиться к WiFi
  while ( WiFi.status() != WL_CONNECTED){            //Пока плата не подключена к сети выполняем:
   delay(1000);                                      //Ждем 1 сек
   Serial.print("*");                                //   Выводим на экран звездочку
} 
  if (WiFi.status() == WL_CONNECTED){                //Проверяем статус подключеня к сети, если плата подключилась, то:
    Serial.println("");
    Serial.println("WiFi connected");                //Объявляем об этом;
    Serial.println("IP address: ");                  //Выводим IP Адрес..
    Serial.println(WiFi.localIP());                             //..нашей платы
  }
  //--------------------------------------------------//
  
}






void loop() {
  //---------Подключение к MQTT ------------------------//
    if (WiFi.status() == WL_CONNECTED) {
    if (!client.connected()) {
      Serial.println("Connecting to MQTT server");
      if (client.connect(MQTT::Connect("arduinoClient2")
                         .set_auth(mqtt_user, mqtt_pass))) {

                          
        Serial.println("Connected to MQTT server");
        client.set_callback(callback);
        client.subscribe("Led"); // подписывааемся по топик с данными для светодиода
        
      } else {
        Serial.println("Could not connect to MQTT server");   
      }
    }

    if (client.connected()){
      client.loop();
      Send();
  }
  
}






//початок коду осмоса

 
bool btnState = !digitalRead(D1);
   bool btnState1 = !digitalRead(D2);
   bool btnState2 = !digitalRead(D3);
   bool btnState3 = !digitalRead(D4);


  if (btnState && !motionDetected) {  // обработчик нажатия
    motionDetected = true;
    Serial.println("press");
  //  bot.sendMessage(CHAT_ID, "НАСОС_РАБОТА", "");
   Serial.print("НАСОС_РАБОТА");
    motor = "1" ;//
    if (skid){
//bot.sendMessage(CHAT_ID, "Зброс аваії", "");
    skid = false ;
    }
    

  }
  if (!btnState && motionDetected) {  // обработчик отпускания
    motionDetected = false;  
     //bot.sendMessage(CHAT_ID, "НАСОС_СТОП", "");
       motor = "0" ;//
       Serial.print("НАСОС_стоп");
  }

//УРОВЕНЬ
  if (btnState1 && !motionDetected1) {  // обработчик нажатия
    motionDetected1 = true;
    Serial.println("press");
  //  bot.sendMessage(CHAT_ID, "БАК_ПОЛН", "");
  Serial.print("БАК_ПОЛН");
     yroven = "1" ;//
  }
  if (!btnState1 && motionDetected1) {  // обработчик отпускания  БАК НЕ ПОЛН И МОТОР СТОП = ПОПА (И ВРЕМЯ)
    motionDetected1 = false;  
     //bot.sendMessage(CHAT_ID, "БАК_НЕ_ПОЛН", "");
      Serial.print("БАК_неПОЛН");
      yroven = "0" ;//
  }

//РКФ
   if (btnState3 && !motionDetected3) {  // обработчик нажатия
    motionDetected3 = true;
    RKF = "1" ;
    Serial.println("press");
    //bot.sendMessage(CHAT_ID, "авария РКФ", "");
  }
  if (!btnState3 && motionDetected3) {  // обработчик отпускания
    motionDetected3 = false;  
    RKF = "0" ;
    // bot.sendMessage(CHAT_ID, "напруга є", "");
  }




//ДАВ НИЖ НОРМ

 if (btnState2 && !motionDetected2) {  // обработчик нажатия
    motionDetected2 = true;
    Serial.println("press");
    presure = "1" ;
   // bot.sendMessage(CHAT_ID, "ДАВ_НИЖ_НОРМ", "");
  }
  if (!btnState2 && motionDetected2) {  // обработчик отпускания
    motionDetected2 = false;  
    presure = "0" ;
    // bot.sendMessage(CHAT_ID, "ДАВ_НОРМАЛИЗОВАЛОСЬ", "");
  }






  /*
   if (!yroven && !motor) {  // когда не уровень  мотор стоп
   
     if (millis() - timer > 1000) {
      timer = millis();
      SEC = SEC + 1;
      if (SEC > 600) { SEC = 0; MIN = MIN + 1;
      // bot.sendMessage(CHAT_ID, "АВАРИЯ (БАК НЕ ПОЛН, МОТОР ВИКЛ)", "");
       skid = true ;
       }
      // выводим текущий счетчик времени на монитор порта
    // else
     // SEC = 0;
   }
  }

*/









//кінець коду осмоса


}



// Функция отправки показаний 
void Send(){
  if ((millis() - time_send)>1000){
    
  
  client.publish("SumLed",String(sum_led)); // отправляем в топик для светодиода количество изменений
  //Serial.println(String(sum_led));
  delay(10); 

client.publish("MOTOR_S",String(motor)); // отправляем в топик для светодиода количество изменений
//  Serial.println(String(sum_led));
 delay(10);

client.publish("LEVEL_S",String(yroven)); // отправляем в топик для светодиода количество изменений
  Serial.println(String(yroven));
  delay(10);

client.publish("PRESURE_S",String(presure)); // отправляем в топик для светодиода количество изменений
  Serial.println(String(yroven));
  delay(10);

client.publish("RKF_S",String(RKF)); // отправляем в топик для светодиода количество изменений
  Serial.println(String(RKF));
  delay(10);

  
  time_send = millis();
  } 
}