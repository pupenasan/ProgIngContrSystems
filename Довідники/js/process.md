[process](https://nodejs.org/api/process.html#process_process_stdin)

# Process

Об'єкт  `process` є глобальним об'єктом який надає інформацію про процес Node.js та керує ним. Оскільки він є глобальним, то не потребує  `require()`. Але він також може бути явно доступний через  `require()`:

```js
const process = require('process');
```



- [Process](https://nodejs.org/api/process.html#process_process)
  - [Process Events](https://nodejs.org/api/process.html#process_process_events)
    - [Event: 'beforeExit'](https://nodejs.org/api/process.html#process_event_beforeexit)
    - [Event: 'disconnect'](https://nodejs.org/api/process.html#process_event_disconnect)
    - [Event: 'exit'](https://nodejs.org/api/process.html#process_event_exit)
    - [Event: 'message'](https://nodejs.org/api/process.html#process_event_message)
    - [Event: 'multipleResolves'](https://nodejs.org/api/process.html#process_event_multipleresolves)
    - [Event: 'rejectionHandled'](https://nodejs.org/api/process.html#process_event_rejectionhandled)
    - [Event: 'uncaughtException'](https://nodejs.org/api/process.html#process_event_uncaughtexception)
      - [Warning: Using 'uncaughtException'` correctly](https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly)
    - [Event: 'uncaughtExceptionMonitor'](https://nodejs.org/api/process.html#process_event_uncaughtexceptionmonitor)
    - [Event: 'unhandledRejection'](https://nodejs.org/api/process.html#process_event_unhandledrejection)
    - [Event: 'warning'](https://nodejs.org/api/process.html#process_event_warning)
      - [Emitting custom warnings](https://nodejs.org/api/process.html#process_emitting_custom_warnings)
    - [Signal Events](https://nodejs.org/api/process.html#process_signal_events)
  - [process.abort](https://nodejs.org/api/process.html#process_process_abort)
  - [process.allowedNodeEnvironmentFlags](https://nodejs.org/api/process.html#process_process_allowednodeenvironmentflags)
  - [process.arch](https://nodejs.org/api/process.html#process_process_arch)
  - [process.argv](https://nodejs.org/api/process.html#process_process_argv)
  - [process.argv0](https://nodejs.org/api/process.html#process_process_argv0)
  - [process.channel](https://nodejs.org/api/process.html#process_process_channel)
  - [process.chdir](https://nodejs.org/api/process.html#process_process_chdir_directory)
  - [process.config](https://nodejs.org/api/process.html#process_process_config)
  - [process.connected](https://nodejs.org/api/process.html#process_process_connected)
  - [process.cpuUsage](https://nodejs.org/api/process.html#process_process_cpuusage_previousvalue)
  - [process.cwd](https://nodejs.org/api/process.html#process_process_cwd)
  - [process.debugPort](https://nodejs.org/api/process.html#process_process_debugport)
  - [process.disconnect](https://nodejs.org/api/process.html#process_process_disconnect)
  - [process.dlopen](https://nodejs.org/api/process.html#process_process_dlopen_module_filename_flags)
  - [process.emitWarning](https://nodejs.org/api/process.html#process_process_emitwarning_warning_options)
  - [process.emitWarning](https://nodejs.org/api/process.html#process_process_emitwarning_warning_type_code_ctor)
    - [Avoiding duplicate warnings](https://nodejs.org/api/process.html#process_avoiding_duplicate_warnings)
  - [process.env](https://nodejs.org/api/process.html#process_process_env)
  - [process.execArgv](https://nodejs.org/api/process.html#process_process_execargv)
  - [process.execPath](https://nodejs.org/api/process.html#process_process_execpath)
  - [process.exit](https://nodejs.org/api/process.html#process_process_exit_code)
  - [process.exitCode](https://nodejs.org/api/process.html#process_process_exitcode)
  - [process.getegid](https://nodejs.org/api/process.html#process_process_getegid)
  - [process.geteuid](https://nodejs.org/api/process.html#process_process_geteuid)
  - [process.getgid](https://nodejs.org/api/process.html#process_process_getgid)
  - [process.getgroups](https://nodejs.org/api/process.html#process_process_getgroups)
  - [process.getuid](https://nodejs.org/api/process.html#process_process_getuid)
  - [process.hasUncaughtExceptionCaptureCallback](https://nodejs.org/api/process.html#process_process_hasuncaughtexceptioncapturecallback)
  - [process.hrtime](https://nodejs.org/api/process.html#process_process_hrtime_time)
  - [process.hrtime.bigint](https://nodejs.org/api/process.html#process_process_hrtime_bigint)
  - [process.initgroups](https://nodejs.org/api/process.html#process_process_initgroups_user_extragroup)
  - [process.kill](https://nodejs.org/api/process.html#process_process_kill_pid_signal)
  - [process.mainModule](https://nodejs.org/api/process.html#process_process_mainmodule)
  - [process.memoryUsage](https://nodejs.org/api/process.html#process_process_memoryusage)
  - [process.nextTick](https://nodejs.org/api/process.html#process_process_nexttick_callback_args)
  - [process.noDeprecation](https://nodejs.org/api/process.html#process_process_nodeprecation)
  - `process.pid` - повертає ідентифікатор процесу PID `console.log('This process is pid ${process.pid}');`
  - `process.platform` - повертає текстовий ідентифікатор платформи `console.log('This platform is ${process.platform}');`
  - `process.ppid` - повертає ідентифікатор батьківського процесу `console.log('The parent process is pid ${process.ppid})';`
  - [process.release](#process.release) - повертає `Object` з метаданими про поточний реліз, включаючи URLs для ресурсів  
  - [process.report](https://nodejs.org/api/process.html#process_process_report)
    - [process.report.compact](https://nodejs.org/api/process.html#process_process_report_compact)
    - [process.report.directory](https://nodejs.org/api/process.html#process_process_report_directory)
    - [process.report.filename](https://nodejs.org/api/process.html#process_process_report_filename)
    - [process.report.getReport](https://nodejs.org/api/process.html#process_process_report_getreport_err)
    - [process.report.reportOnFatalError](https://nodejs.org/api/process.html#process_process_report_reportonfatalerror)
    - [process.report.reportOnSignal](https://nodejs.org/api/process.html#process_process_report_reportonsignal)
    - [process.report.reportOnUncaughtException](https://nodejs.org/api/process.html#process_process_report_reportonuncaughtexception)
    - [process.report.signal](https://nodejs.org/api/process.html#process_process_report_signal)
    - [process.report.writeReport](https://nodejs.org/api/process.html#process_process_report_writereport_filename_err)
  - [process.resourceUsage](https://nodejs.org/api/process.html#process_process_resourceusage)
  - [process.send](https://nodejs.org/api/process.html#process_process_send_message_sendhandle_options_callback)
  - [process.setegid](https://nodejs.org/api/process.html#process_process_setegid_id)
  - [process.seteuid](https://nodejs.org/api/process.html#process_process_seteuid_id)
  - [process.setgid](https://nodejs.org/api/process.html#process_process_setgid_id)
  - [process.setgroups](https://nodejs.org/api/process.html#process_process_setgroups_groups)
  - [process.setuid](https://nodejs.org/api/process.html#process_process_setuid_id)
  - [process.setUncaughtExceptionCaptureCallback](https://nodejs.org/api/process.html#process_process_setuncaughtexceptioncapturecallback_fn)
  - [process.stderr](https://nodejs.org/api/process.html#process_process_stderr)
    - [process.stderr.fd](https://nodejs.org/api/process.html#process_process_stderr_fd)
  - [process.stdin](#process.stdin)
    - [process.stdin.fd](https://nodejs.org/api/process.html#process_process_stdin_fd)
  - [process.stdout](#process.stdout)
    - [process.stdout.fd](https://nodejs.org/api/process.html#process_process_stdout_fd)
    - [A note on process I/O](https://nodejs.org/api/process.html#process_a_note_on_process_i_o)
  - [process.throwDeprecation](https://nodejs.org/api/process.html#process_process_throwdeprecation)
  - [process.title](https://nodejs.org/api/process.html#process_process_title)
  - [process.traceDeprecation](https://nodejs.org/api/process.html#process_process_tracedeprecation)
  - [process.umask](https://nodejs.org/api/process.html#process_process_umask_mask)
  - [process.uptime](https://nodejs.org/api/process.html#process_process_uptime)
  - [process.version](https://nodejs.org/api/process.html#process_process_version)
  - [process.versions](https://nodejs.org/api/process.html#process_process_versions)
  - [Exit Codes](https://nodejs.org/api/process.html#process_exit_codes)



## process.release {#process.release}

`process.release` contains the following properties: `name`  A value that will always be `'node'` for Node.js. For legacy io.js releases, this will be `'io.js'`;`sourceUrl`  an absolute URL pointing to a *`.tar.gz`* file containing the source code of the current release; `headersUrl`an absolute URL pointing to a *`.tar.gz`* file containing only the source header files for the current release. This file is significantly smaller than the full source file and can be used for compiling Node.js native add-ons; `libUrl` an absolute URL pointing to a *`node.lib`* file matching the architecture and version of the current release. This file is used for compiling Node.js native add-ons. *This property is only present on Windows builds of Node.js and will be missing on all other platforms.*; `lts`  a string label identifying the [LTS](https://github.com/nodejs/Release) label for this release. 

## process.stdin{#process.stdin}

Властивість `process.stdin` повертає потік, підключений до `stdin` (fd `0`). Це [`net.Socket](https://nodejs.org/api/net.html#net_class_net_socket) (що є [Дуплексним](https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams ) stream), якщо fd `0` не посилається на файл, в цьому випадку це потік [Readada](https://nodejs.org/api/stream.html#stream_readable_streams).

```js
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
  let chunk;
  // Use a loop to make sure we read all available data.
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});
process.stdin.on('end', () => {
  process.stdout.write('end');
});
```

Як потік [Duplex](https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams) потік `process.stdin` також може використовуватися в "старому режимі", сумісному зі сценаріями, написаними для Node.js до v0.10. Для отримання додаткової інформації див [Сумісність потоку](https://nodejs.org/api/stream.html#stream_compatibility_with_older_node_js_versions).

У режимі "старих" потоків потік `stdin` призупинено за замовчуванням, тому для читання з нього потрібно викликати` process.stdin.resume() `. Зауважимо також, що виклик `process.stdin.resume ()` сам перейшов би потік у "старий" режим.

## process.stdout{#process.stdout}

The `process.stdout` property returns a stream connected to `stdout` (fd `1`). It is a [`net.Socket](https://nodejs.org/api/net.html#net_class_net_socket) (which is a [Duplex](https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams) stream) unless fd `1` refers to a file, in which case it is a [Writable](https://nodejs.org/api/stream.html#stream_writable_streams) stream.

For example, to copy `process.stdin` to `process.stdout`:

Властивість `process.stdout` повертає потік, підключений до ` stdout` (fd `1`). Це [`net.Socket](https://nodejs.org/api/net.html#net_class_net_socket) (що є [Дуплексним](https://nodejs.org/api/stream.html#stream_duplex_and_transform_streams ) stream), якщо fd `1` не посилається на файл, у цьому випадку це потік [Wrtable](https://nodejs.org/api/stream.html#stream_writable_streams).

Наприклад, скопіювати `process.stdin` в` process.stdout`:

```js
process.stdin.pipe(process.stdout);
```

`process.stdout` differs from other Node.js streams in important ways. See [note on process I/O](https://nodejs.org/api/process.html#process_a_note_on_process_i_o) for more information.

### process.stdout.fd

Це властивість посилається на значення базового дескриптора файлу `process.stdout`. Значення зафіксовано у `1`. У потоках Worker це поле не існує.