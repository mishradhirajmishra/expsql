const con = require('../database/connection');
var datFormat =require('dateformat');
module.exports.index=(req,res)=>{
    query= "select * from event";
    con.query(query,(err,result)=>{
        result.forEach((item)=>{
            item.date=datFormat(item.date,"yyyy-mm-dd");
        });
        res.render('index', { title: 'All Events', events :result });
    })
}

module.exports.addGet=(req,res)=>{
    res.render('addEvent', { title: 'Add Event' });
}

module.exports.addPost=(req,res)=>{

    var name = req.body.name;
    var date = req.body.date;
    if (req.files && Object.keys(req.files).length != 0) {
  
        var image = req.files.image.name;
        /*=====================================*/
        var dir = "./public/images/"+image;
        sampleFile = req.files.image;
        sampleFile.mv(dir, function(err) {
            if (err)
                return res.status(500).send(err);
        });
        /*=====================================*/
        var query ="INSERT INTO event (name,image,date) VALUES ('"+name+"','"+image+"','"+date+"')";
 
    }else{
        var query ="INSERT INTO event (name,date) VALUES ('"+name+"','"+date+"')";
       
    
    }
    con.query(query,function (err,result) {
        res.redirect('http://localhost:3000');
    });
}

module.exports.editGet=(req,res)=>{
    var id = req.params.id;
    var query="select * from event where id= '"+id+"'";
    con.query(query,(err,result)=>{
        result[0].date = datFormat(result[0].date,"yyyy-mm-dd");
        res.render('editEvent', { title: 'Update Event', event:result[0] });
    })
}

module.exports.updatePost=(req,res)=>{
    var id = req.body.id;
    var name = req.body.name;
    var date = req.body.date;
    
    if (req.files && Object.keys(req.files).length != 0) {
  
        var image = req.files.image.name;
        /*=====================================*/
        var dir = "./public/images/"+image;
        sampleFile = req.files.image;
        sampleFile.mv(dir, function(err) {
            if (err)
                return res.status(500).send(err);
        });
        /*=====================================*/
        var query ="Update event SET name='"+name+"',image='"+image+"',date='"+date+"'where id='"+id+"'";
 
    }else{
        var query ="Update event SET name='"+name+"',date='"+date+"'where id='"+id+"'";
       
    
    }
    con.query(query,function (err,result) {
        res.redirect('http://localhost:3000');
    });
}

module.exports.delete=(req,res,next)=>{
    var id = req.body.id;
    var query="delete from event where id = '"+id+"'"
    con.query(query,(err,result)=>{    
    });
    next();
}