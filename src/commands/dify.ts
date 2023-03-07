import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'dify',
  run: async (toolbox) => {
    const { print } = toolbox
    print.success(`
      ###########################################
      ### Build components for dify ###
      ###########################################
    `)
  },
}

module.exports = command
