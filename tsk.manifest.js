exports.bundle =
[
    {
        module: 'lib/tsk-scss',
        config:
        {
            sourceDir: `frontend`,
            whitelist: [/\.s[ac]+ss$/i],
            blacklist: [],
            dstPathFn: (dir, name, ext) => `${ dir }/${ name }.css`
        }
    },
    {
        module: 'lib/tsk-glue-files',
        config:
        {
            sourceDir: `frontend`,
            whitelist: [/\.css$/i],
            blacklist: [],
            outputFile: `output/assets/build.css`,
            header: path => `\n\n/* ${ path } */\n\n`
        }
    },
    {
        module: 'lib/tsk-glue-files',
        config:
        {
            sourceDir: `frontend`,
            whitelist: [/\.js$/i],
            blacklist: [/index\.js$/i],
            outputFile: `output/assets/build.js`,
            header: path => `\n\n/* ${ path } */\n\n`
        }
    },
    {
        module: 'lib/tsk-copy-files',
        config:
        {
            sourceDir: `frontend`,
            whitelist: [/\.jpg$/i, /\.png$/i, /\.ico$/i, /\.woff2*$/i],
            blacklist: [],
            dstPathFn: (dir, name, ext) => `output/assets/${ name }.${ ext }`,
            overwrite: false,
        }
    },
]

exports.minify =
[
    {
        module: 'lib/tsk-minify',
        config:
        {
            js:
            {
                enabled: true,
                dir: `output`,
                whitelist: [/\.js$/i],
                blacklist: [],
                opts:
                {
                    mangle:
                    {
                        keepClassName: true
                    }
                }
            },
            css:
            {
                enabled: true,
                dir: `output`,
                whitelist: [/\.css$/i],
                blacklist: [],
                opts:
                {

                }
            },
            html:
            {
                enabled: true,
                dir: `output`,
                whitelist: [/\.html$/i],
                blacklist: [],
                opts:
                {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeTagWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                }
            }
        }
    },
]

exports.serve =
[
    {
        module: 'lib/tsk-serve',
        config:
        {
            dir: `output`,
            port: 1337,
            redirects: [url => url === '/' ? '/the_great_wave' : url],
            rewrites: [path => path.replace('the_great_wave', '')],
            autoindex: true
        }
    }
]

exports.build =
[
    {
        module: 'lib/init'
    },
    {
        module: 'lib/tsk-read-yamd',
        config:
        {
            sourceDir: `source`,
            whitelist: [/\.md$/i],
            blacklist: [],
            outputFile: `tmp/entries.json`,
        }
    },
    {
        module: 'lib/compile'
    },
    {
        module: 'lib/render'
    },
    {
        module: 'lib/write'
    },
    {
        module: 'lib/tsk-copy-files',
        config:
        {
            sourceDir: `source`,
            whitelist: [/\.jpg$/i],
            blacklist: [],
            dstPathFn: (dir, name, ext) => `${ dir.replace('source', 'output') }/${ name }.${ ext }`,
            overwrite: false
        }
    },
    {
        module: 'lib/tsk-thumbnails',
        config:
        {
            sourceDir: `output/gallery`,
            whitelist: [/original\.jpg$/i],
            blacklist: [],
            width:     640,
            height:    undefined,
            dstPathFn: (dir, name, ext) => `${ dir }/preview.${ ext }`,
            overwrite: false,
        }
    },
    {
        module: 'lib/tsk-thumbnails',
        config:
        {
            sourceDir: `output/gallery`,
            whitelist: [/original\.jpg$/i],
            blacklist: [],
            width:     320,
            height:    320,
            dstPathFn: (dir, name, ext) => `${ dir }/square.${ ext }`,
            overwrite: false,
        }
    },

    // etc

    ...exports.bundle,
    ...exports.minify,
    ...exports.serve
]