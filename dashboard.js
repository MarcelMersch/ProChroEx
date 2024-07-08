   chrome.storage.local.get(null, function(items) {
      
      var allKeys = Object.keys(items);
      var werte = Object.values(items);
      
      //Auf Schlüssel der letzten Woche filten
      //1000 * 60 * 60 * 24 * 7 Millisekunden pro Woche
      
      //####Code zum filtern auf letzte Woche noch einfügen
      
      //URLs nach SecondLevelDomain bereinigen
      //  \/\/\S+\.
      //Regex Ausdruck, dass vom //nach http bis zum ersten Punk Matcht. Ist ok, man konnte die TopLevel Domain noch mit auslesen.
      //Durch Array Werte iterieren und das erste Element(URL) ändern
      
      for (var i = 0; i < werte.length; i++) {
         try{
            werte[i][0] = werte[i][0].match(/\/\/\S+\//)[0];
         }catch{
            try{werte[i][0] = "";}catch{}
            
         }   
      }

      //Letztes und erste 6 Elemente des Strings entfernen
      for (var i = 0; i < werte.length; i++) {
         try{
            werte[i][0] = werte[i][0].substring(6, werte[i][0].length - 1);
         }catch{}
      }
      for (var i = 0; i < werte.length; i++) {
         try{
            werte[i][0] = werte[i][0].match(/\S+\//)[0].substring(0,werte[i][0].match(/\S+\//)[0].length - 1);
         }catch{}
      }

      console.log(werte);
      
      //Nach URL gruppieren
      var urls = []
    
      //Uber alle Werte iterieren und einzigartige URLS in die Liste urls einfuegen
      for (const element of werte){
          if (!(urls.includes(element[0]))){
            urls.push(element[0])
          }
      }
    
      //Aus den einzigartien URLs wird die Liste Ergebnisse erzeugt, welche mit der URL und einer 0 als Dauer initialisiert wird.
      var ergebnisse =[]
      for (const element of urls){
        ergebnisse.push([element, 0])
      }
    
      //Über alle Werte iterieren und Zeiten addieren, wenn die URLs übereinstimmen
      for (const element of werte){
        for (const a of ergebnisse){
          if(element[0] == a[0]){
            a[1] += element[1]
        }
        }
      }
    
      let sourceNames = [], sourceCount = [];
    
    
      //Undefined Einträge löschen
      for (var i = 0; i < ergebnisse.length; i++){
        if(ergebnisse[i][0] == null){
         ergebnisse.splice(i, 1);
        }
     }
    
      //Einträge bereinigen
      for (var i = 0; i < ergebnisse.length; i++){
         if(ergebnisse[i][0].length < 3){
          ergebnisse.splice(i, 1);
         }
      }
    
    
      console.log("Start Push")            
      for (const x of ergebnisse) { 
        sourceNames.push(x[0]);
        sourceCount.push(x[1]);
        }
    
         //Format der Dauer von Millisekunden auf Minuten anpassen
         for (var i = 0; i < ergebnisse.length; i++){
           ergebnisse[i][1] = ergebnisse[i][1] / (1000 * 60);
           //Auf eine Nachkommastelle runden
           ergebnisse[i][1] = ergebnisse[i][1].toFixed(1);
       }

    //Liste mit Objekten für CanjasJS Format erzeugen
    var data = []

    for (var i = 0; i < ergebnisse.length; i++){
      let objekt = {
         y: ergebnisse[i][1],
         label: ergebnisse[i][0]
      }
      data.push(objekt);
   }
   
    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title:{
         text: "Nutzungszeiten"
      },
      axisY: {
         title: "Sekunden"
      },
      data: [{        
         type: "pie",  
         startAngle: 240,
         legendMarkerColor: "grey",
         indexLabel: "{label} {y}",
         dataPoints: data
      }]
   });
   chart.render();


    
    
    
    
    }) 







