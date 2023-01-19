const client = require('./connection.js')
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/rana', (req, res)=>{
    client.query(`Select id, "RA_OF_NA", "REGISTER", "FOLIO", "DATUM", "PLAATS", kaart_nr, "V_NAAM", "V_NAAM_2", "K_NAAM", "K_NAAM_2", "KAD_PLAATS", "KAD_A", "KAD_NR", "KAD_NR_2", "KAD_NR_3", "KAD_NR_4" from rana order by id limit 100`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/totRec', (req, res)=>{
    client.query(`Select count(*) 
    FROM rana 
    WHERE (LOWER("V_NAAM") lIKE LOWER('%${req.query.v_naam}%') OR LOWER("V_NAAM_2") lIKE LOWER('%${req.query.v_naam}%')) AND 
          (LOWER("K_NAAM") lIKE LOWER('%${req.query.k_naam}%') OR LOWER("K_NAAM_2") lIKE LOWER('%${req.query.k_naam}%')) AND 
          (("KAD_PLAATS" LIKE '%${req.query.kad_plaats}%') OR ('${req.query.kad_plaats}' = '%' )) AND
          (("KAD_A" LIKE '%${req.query.kad_sectie}%') OR ('${req.query.kad_sectie}' = '%' ))  AND 
          (("KAD_NR" = '${req.query.kad_kavel}') OR ("KAD_NR_2" = '${req.query.kad_kavel}')  OR ("KAD_NR_3" = '${req.query.kad_kavel}') OR ("KAD_NR_4" = '${req.query.kad_kavel}') OR ("KAD_NR_5" = '${req.query.kad_kavel}') OR ('${req.query.kad_kavel}' = '%')) AND
          (("RA_OF_NA" LIKE '%${req.query.ra_of_na}%') OR ('${req.query.ra_of_na}' = '%' ))  AND 
          (("REGISTER" LIKE '%${req.query.register}%') OR ('${req.query.register}' = '%' ))  AND 
          (("FOLIO" LIKE '%${req.query.folio}%') OR ('${req.query.folio}' = '%' ))  AND 
          (("DATUM" LIKE '%${req.query.datum}%') OR ('${req.query.datum}' = '%' ))  AND 
          (("PLAATS" LIKE '%${req.query.plaats}%') OR ('${req.query.plaats}' = '%' ))  AND 
          (("KAART_NR" LIKE '%${req.query.kaart_nr}%') OR ('${req.query.kaart_nr}' = '%' ))`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });
  client.end;
})

app.get('/selrana', (req, res)=>{
    client.query(`Select id, "RA_OF_NA", "REGISTER", "FOLIO", "DATUM", "PLAATS", kaart_nr, "V_NAAM", "V_NAAM_2", "K_NAAM", "K_NAAM_2", "KAD_PLAATS", "KAD_A", "KAD_NR", "KAD_NR_2", "KAD_NR_3", "KAD_NR_4" 
      FROM rana 
      WHERE (LOWER("V_NAAM") lIKE LOWER('%${req.query.v_naam}%') OR LOWER("V_NAAM_2") lIKE LOWER('%${req.query.v_naam}%')) AND 
            (LOWER("K_NAAM") lIKE LOWER('%${req.query.k_naam}%') OR LOWER("K_NAAM_2") lIKE LOWER('%${req.query.k_naam}%')) AND 
            (("KAD_PLAATS" LIKE '%${req.query.kad_plaats}%') OR ('${req.query.kad_plaats}' = '%' )) AND
            (("KAD_A" LIKE '%${req.query.kad_sectie}%') OR ('${req.query.kad_sectie}' = '%' ))  AND 
            (("KAD_NR" = '${req.query.kad_kavel}') OR ("KAD_NR_2" = '${req.query.kad_kavel}')  OR ("KAD_NR_3" = '${req.query.kad_kavel}') OR ("KAD_NR_4" = '${req.query.kad_kavel}') OR ("KAD_NR_5" = '${req.query.kad_kavel}') OR ('${req.query.kad_kavel}' = '%')) AND
            (("RA_OF_NA" LIKE '%${req.query.ra_of_na}%') OR ('${req.query.ra_of_na}' = '%' ))  AND 
            (("REGISTER" LIKE '%${req.query.register}%') OR ('${req.query.register}' = '%' ))  AND 
            (("FOLIO" LIKE '%${req.query.folio}%') OR ('${req.query.folio}' = '%' ))  AND 
            (("DATUM" LIKE '%${req.query.datum}%') OR ('${req.query.datum}' = '%' ))  AND 
            (("PLAATS" LIKE '%${req.query.plaats}%') OR ('${req.query.plaats}' = '%' ))  AND 
            (("KAART_NR" LIKE '%${req.query.kaart_nr}%') OR ('${req.query.kaart_nr}' = '%' ))
            ORDER BY id
      LIMIT 100 OFFSET ${req.query.offset}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/rna/:id', (req, res)=>{
    client.query(`Select * from rana where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})



