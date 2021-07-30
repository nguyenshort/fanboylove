spawn = require('child_process').spawn
let backupProcess = spawn('mongodump', ['--db=hinhgay'])

backupProcess.on('exit', (code, signal) => {
  if (code) console.log('Backup process exited with code ', code)
  else if (signal)
    console.error('Backup process was killed with singal ', signal)
  else console.log('Successfully backedup the database')
})
