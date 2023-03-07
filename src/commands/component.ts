import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'component',
  alias: ['c'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info, success, highlight, muted },
      prompt,
    } = toolbox

    let type = parameters.first
    let path = parameters.second
    let name = parameters.third


    if (!path || !name || !type) {

      const result = await prompt.ask([
        {
          type: 'select',
          name: 'type',
          message: 'What type of component?',
          choices: ['Elements', 'Forms', 'Layouts', 'Pages', 'Tables', 'Contents', 'Charts'],
        },
        {
        type: 'input',
        name: 'path',
        message: 'What path from component? ( Camelcase )',
        },
        {
          type: 'input',
          name: 'name',
          message: 'What name component? ( Camelcase )',
        }
      ])

      if (result && result.type) {
        type = result.type
      }

      if (result && result.path) {
        path = result.path
      }
      if (result && result.name) {
        name = result.name
      }
    }

    highlight(`Waiting creating component ${name}...`)
    await toolbox.system.run('sleep 2')

    muted('Creating Document...')
    await generate({
      template: 'Base.documentation.mdx.ejs',
      target: `components/${type.toLocaleLowerCase()}/${path.toLocaleLowerCase()}/${name}.documentation.mdx`,
      props: { name, path, type },
    })
    info('🚀 Document created with successfull!')

    await toolbox.system.run('sleep 1')

    muted('Creating Mocks...')
    await generate({
      template: 'Base.mocks.ts.ejs',
      target: `components/${type.toLocaleLowerCase()}/${path.toLocaleLowerCase()}/${name}.mocks.ts`,
      props: { name, path, type },
    })
    info('🚀 Mock created with successfull!')

    await toolbox.system.run('sleep 1')

    muted('Creating Module CSS...')
    await generate({
      template: 'Base.module.css.ejs',
      target: `components/${type.toLocaleLowerCase()}/${path.toLocaleLowerCase()}/${name}.module.css`,
      props: { name, path, type },
    })
    info('🚀 Module created with successfull!')

    await toolbox.system.run('sleep 1')

    muted('Creating Base StoryBook CSS...')
    await generate({
      template: 'Base.stories.tsx.ejs',
      target: `components/${type.toLocaleLowerCase()}/${path.toLocaleLowerCase()}/${name}.stories.tsx`,
      props: { name, path, type },
    })
    info('🚀 StoryBook created with successfull!')

    await toolbox.system.run('sleep 1')

    muted('Creating Component...')
    await generate({
      template: 'Base.tsx.ejs',
      target: `components/${type.toLocaleLowerCase()}/${path.toLocaleLowerCase()}/${name}.tsx`,
      props: { name, path, type },
    })
    info('🚀 Component created with successfull!')

    await toolbox.system.run('sleep 3')

    success(`
    
#################################################################################`)

    success(`Component created successful

components/${type.toLocaleLowerCase()}/${path.toLocaleLowerCase()}

✅ ${name}.documentation.mdx
✅ ${name}.mocks.ts
✅ ${name}.module.css
✅ ${name}.stories.tsx
✅ ${name}.tsx
    `)
    success('#################################################################################')
  },

}

