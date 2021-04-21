var webpack=require('webpack');  
var path=require("path");    
var srcPath=path.resolve(__dirname,"client");    
var distPath=path.resolve(__dirname,"public");   
var config={  
    devtool:'source-map',  
    entry:[  
        srcPath+"/app.js"  
    ],  
    mode: 'development',
    output:{    
        path:distPath,    
        publicPath: '/',  
        filename:"bundle.js"    
    },    
    resolve: {   
        extensions: [ '.js', '.jsx','.ts','.tsx']      
    },  
    module:{  
        rules:[  
            {    
                test:/\.js?$/,    
                exclude: /node_modules/,    
                include: /client/,    
                loader:"babel-loader",           
            },  
            {    
                test:/\.jsx?$/,    
                exclude: /node_modules/,    
                include: /client/,    
                loader:"babel-loader",     
            },  
            {  
                test: /\.tsx?$/,  
                loader: "ts-loader",  
                exclude: /node_modules/  
            }  
        ]  
    },  
    devServer:{  
        hot:true,  
        port:8000  
    }  
}  

module.exports=config; 