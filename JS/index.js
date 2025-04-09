const express = require ("express");
const mysql = require ('mysql');
const cors = require ('cors') ;
const bodyParser = require('body-parser');


//Create a connection
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root', 
    password : '',
    database : 'jam'

});

//connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySQL Connected ... ');
});

const app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


// app.get('/getEmployee' , (req, res)=>{
//     let sql = 'Select * from employee';
//     let query = db.query(sql , (err , results)=> {
//         if(err) throw err;
//         console.log(results);
//         res.send('Employees fetched...');
//     });
// });




app.post('/', (req , res) => {
    const body = req.body ; 
    const {parcel} = req.body; 

    let sql1 = 'SELECT pid FROM customer WHERE pid=(SELECT max(pid) FROM customer)'
    let query1 = db.query(sql1 , (err , result) => {
        if(err) throw err ; 
        x = result[0].pid + 1 ;

        let post0 = {pid:x , email:'ayhaga@gmail.com' , phone:'00000000000' , fname : 'ayhaga', lname: 'ayhaga' , paymentcard : 411111111117 };
        let sql0 = 'INSERT INTO customer SET ?';
        let query0 = db.query(sql0 , post0 , (err , result0) => {
            if(err) throw err ;

            let sql2 = 'SELECT rid FROM reservation WHERE rid=(SELECT max(rid) FROM reservation)'
            let query2 = db.query(sql2 , (err , result) => {
                if(err) throw err ; 
                y = result[0].rid + 1 ;

                let post = { rid:y ,start_date : req.body.parcel_in , end_date : req.body.parcel_out , pid : x };
                let sql = 'INSERT INTO reservation SET ?';
                let query = db.query(sql , post , (err , result) => {
                    if(err) throw err ; 
                    console.log(result);
                });
            
            });
            
        });
    
    });



    res.status(200).send(req.body)
})

app.post('/category', (req , res) => {
    const body = req.body ; 
    const {parcel} = req.body;
    console.log(req.body);
        
    let sql0 = 'SELECT rid FROM reservation WHERE rid=(SELECT max(rid) FROM reservation)'
    let query0 = db.query(sql0 , (err , result) => {
        if(err) throw err ; 
        x = result[0].rid  ;

        if(req.body.parcel_book == 1) {c = " Double Queen" ; p = 850 ;}
        else if(req.body.parcel_book == 2) {c = "Grand Suite" ; p = 790 ;}
        else if(req.body.parcel_book == 3) {c = "Lion's head penthouse" ; p = 1250 ; }
        else if(req.body.parcel_book == 4) {c = " Island Family" ; p = 1000 ; }

        let post1 = { rid:x , category:c , extras: req.body.parcel_extra };
                let sql1 = 'INSERT INTO rooms SET ?';
                let query1 = db.query(sql1 , post1 , (err , result) => {
                    if(err) throw err ; 
                    console.log(result);

                    let sql2 = 'SELECT extras_price FROM rooms WHERE rid=(SELECT max(rid) FROM reservation)'
                    let query2 = db.query(sql2 , (err , result) => {
                        if(err) throw err ; 
                        y = result[0].extras_price ;

                        p = p + y ;

                        let sql = `UPDATE reservation SET price = '${p}' where rid ='${x}'`;
                        let query = db.query(sql , (err , result) => {
                            if(err) throw err ; 
                            console.log(result);
                        });
                    });
                });
    });

    res.status(200).send(req.body)
});

app.post('/details', (req , res) => {
    const body = req.body ; 
    const {parcel} = req.body;
    console.log(req.body);
    
    let sql0 = 'SELECT pid FROM customer WHERE pid=(SELECT max(pid) FROM customer)'
    let query0 = db.query(sql0 , (err , result) => {
        if(err) throw err ; 
        x = result[0].pid  ;

        let post ={email:req.body.parcel_Email, phone:req.body.parcel_Phone,fname: req.body.parcel_Fname, lname: req.body.parcel_Lname, birthday: req.body.parcel_Bdate, nationality:req.body.parcel_Nationality , paymentcard:req.body.parcel_Visa};
        let sql = `UPDATE customer SET ? WHERE pid='${x}' `;
        let query = db.query(sql ,post, (err , result) => {
            if(err) throw err ; 
            console.log(result);

            });
        });

        //insert the invoice data
        let sql2 = 'SELECT IN_id FROM invoice WHERE IN_id=(SELECT max(IN_id) FROM invoice)'
        let query2 = db.query(sql2 , (err , result) => {
            if(err) throw err ; 
            x = result[0].IN_id + 1 ;
            let sql3 = 'SELECT rid , pid FROM reservation WHERE rid=(SELECT max(rid) FROM reservation)'
            let query3 = db.query(sql3 , (err , result) => {
                if(err) throw err ; 
                r = result[0].rid ;
                p = result[0].pid  ;
                let post1 = { rid:r , pid:p , IN_id:x , paymethod:req.body.parcel_method};
                let sql1 = 'INSERT INTO invoice SET ?';
                let query1 = db.query(sql1 , post1 , (err , result) => {
                    if(err) throw err ; 
                    console.log(result);
                });
                });
        });
    res.status(200).send(req.body)
});

app.post('/reserve', (req , res) => {
    const body = req.body ; 
    const {parcel} = req.body;
    console.log(req.body);
    let sql = 'SELECT pid FROM customer WHERE pid=(SELECT max(pid) FROM customer)'
    let query = db.query(sql , (err , result) => {
        if(err) throw err ; 
        x = result[0].pid + 1 ;
        let sql = 'SELECT rid FROM reservation WHERE rid=(SELECT max(rid) FROM reservation)'
        let query = db.query(sql , (err , result) => {
            if(err) throw err ; 
            y = result[0].rid + 1 ;

        let post0 = {pid:x , email:req.body.parcel_Email , phone:req.body.parcel_Phone , fname : req.body.parcel_Fname, lname: req.body.parcel_Lname };
        let sql0 = 'INSERT INTO customer SET ?';
        let query0 = db.query(sql0 , post0 , (err , result) => {
            if(err) throw err ;
        
        
        let post1 = {pid:x , rid:y, start_date:req.body.parcel_Bdate , end_date:req.body.parcel_Bdate};
        let sql1 = 'INSERT INTO reservation SET ?';
        let query1 = db.query(sql1 , post1 , (err , result) => {
                if(err) throw err ;
                    

        let post2 = { rid:y, description: req.body.parcel_Description , Number_Tables:req.body.parcel_NoTables, timing:req.body.parcel_Timing, meal: req.body.parcel_Meal};
        let sql2 = 'INSERT INTO restaurant SET ?';
        let query2 = db.query(sql2 , post2 , (err , result) => {
                        if(err) throw err ;

            });
                    });
                });
            });
        });
    res.status(200).send(req.body)
});


app.get("/info", function fn (request , response){
    
    let sql0 = 'SELECT price FROM reservation WHERE rid=(SELECT max(rid) FROM reservation)'
    let query0 = db.query(sql0 , (err , result) => {
        if(err) throw err ; 
        x = result[0].price  ;
        response.status(200).json({info:x});
        });
    
})
app.get("/receipt", function fn (request , response){
    
    let sql0 = 'SELECT price , start_date , end_date  FROM reservation WHERE rid=(SELECT max(rid) FROM reservation)'
    let query0 = db.query(sql0 , (err , result) => {
        if(err) throw err ; 
        //c = result[0].category ;
        x = result[0].price  ;
        s = result[0].start_date  ;
        e = result[0].end_date  ;
    let sql = 'SELECT category  FROM rooms WHERE rid=(SELECT max(rid) FROM rooms)'
    let query = db.query(sql , (err , result) => {
        if(err) throw err ; 
        c = result[0].category ;


        response.status(200).json({p_info:x , start_info:s , end_info:e  , room_info:c});
            });
    });
    });

    app.post('/account', (req , res) => {
        const body = req.body ; 
        const {parcel} = req.body;
        console.log(req.body);

        let post = { email: req.body.parcel_Email }
        let sql = 'SELECT pid, fname , lname , birthday , nationality FROM customer where ? '
        let query = db.query(sql , post , (err , result) => {
            if(err) throw err ; 

            //console.log("ttttttttttttttttttttttttttt      "+result[0].email)
            if(result[0] != undefined ) {
                //having an existing account
                x = "existingAccount"  ;
                res.status(200).json({info:x , info_fname:result[0].fname , info_lname:result[0].lname , info_bd:result[0].birthday , info_nation:result[0].nationality , info_pid:result[0].pid});
        

                }
            });
        //res.status(400).send("something wrong!")
    });

    // app.get("/existingAccount", function fn (request , response){
    //     x = "existingAccount"  ;

    //     // console.log("ttttttttttttttttttttttttttt      "+result[0].email)
    //     let post1 = { email: result[0].email }
    //     let sql1 = 'SELECT pid, fname , lname , birthday , nationality FROM customer where ? '
    //     let query1 = db.query(sql1 , post1 , (err , result1) => {
    //         if(err) throw err ; 

    //     response.status(200).json({info:x , info_fname:result1[0].fname , info_lname:result1[0].lname , info_bd:result1[0].birthday , info_nation:result1[0].nationality , info_pid:result1[0].pid});
    //     });
    // });



    app.post('/updating', (req , res) => {
        const body = req.body ; 
        const {parcel} = req.body;
        console.log(req.body);
        
            x = req.body.parcel_pid;
            let post ={pid:req.body.parcel_pid};
            let sql = `UPDATE reservation SET ? where rid=(SELECT max(rid) FROM reservation)`
            let query = db.query(sql ,post, (err , result) => {
                if(err) throw err ; 
                });

            let post9 = {phone:req.body.parcel_Phone , paymentcard:req.body.parcel_Visa }
            let sql9 = `update customer set ? where pid = '${x}'` 
            let query9 = db.query(sql9 ,post9, (err , result) => {
                if(err) throw err ; 
                });

            //insert the invoice data
            let sql2 = 'SELECT IN_id FROM invoice WHERE IN_id=(SELECT max(IN_id) FROM invoice)'
            let query2 = db.query(sql2 , (err , result) => {
                if(err) throw err ; 
                y = result[0].IN_id + 1 ;

                let sql3 = 'SELECT rid , pid FROM reservation WHERE rid=(SELECT max(rid) FROM reservation)'
                let query3 = db.query(sql3 , (err , result1) => {
                    if(err) throw err ; 
                    r = result1[0].rid ;
                    p = result1[0].pid  ;
                    let post1 = { rid:r , pid:p , IN_id:y , paymethod:req.body.parcel_method};
                    let sql1 = 'INSERT INTO invoice SET ?';
                    let query1 = db.query(sql1 , post1 , (err , result) => {
                        if(err) throw err ; 
                        console.log(result);
                    });
                });
            });

            //delete the ay haga customer
            let sqld = 'DELETE FROM customer WHERE pid=(SELECT max(pid) FROM customer)'
            let queryd = db.query(sqld , (err , result) => {
                if(err) throw err ; 
                });

        res.status(200).send(req.body)
    });

app.listen(8282,function welcome () {
    console.log("server start on port 8282");
});

app.get('/reserve',function(req,res){
    res.render('reserve');
});

