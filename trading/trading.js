var pyshell = require('python-shell');


pyshell.PythonShell.run('./trading/trading.py', null, function (err, results) {
    if (err) throw err;
    var res = console.log(results[0]);
    return res;
});

