module.exports = { 
    entry: __dirname + '/src/app.tsx',   
    output: { 
       filename: 'webpackbundle.js'  
    }, 
    module: { 
       rules: [ 
           { 
              test: /.tsx$/, 
              exclude: /node_modules/, 
              use: { 
                 loader: 'babel-loader',   
                 options: { 
                    presets: [ '@babel/preset-typescript' ]  
                 } 
              } 
           } , 
       ] 
    } 
 }; 