#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const mainPath = path.dirname(fs.realpathSync(__filename))
const soundPath = path.join(mainPath, './sextafeira')

const commands = {
  win32: path.join(mainPath, './forWindows.vbs') + ' ' + soundPath + '.mp3',
  linux: 'paplay ' + soundPath + '.ogg',
  darwin: 'afplay ' + soundPath + '.mp3'
}

const main = () => {
  const platform = process.platform
  const command = commands[platform]

  if (command) {
    return exec(command, (error) => {
      if (error) {
        console.error(error)
      }
    })
  }
}

module.exports = main

if (!module.parent) {
  main()
}
