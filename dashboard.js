   chrome.storage.local.get(null, function(items) {
      
      var allKeys = Object.keys(items);
      var werte = Object.values(items);
      
      //Auf Schlüssel der letzten Woche filten
      // Millisekunden pro Woche: 1000 * 60 * 60 * 24 * 7
      
      //Aktuelle Zeit auslesen
      var zeitAktuell = Date.now();
      
      //Ermitteln, wie viele Einträge aus der letzten Woche stammen
      //Liste von Ende aus iterieren
      var anzahlWochenEintraege = 0;
      for (var i = allKeys.length; i > 0 ; i--) {
         anzahlWochenEintraege++;
         if(allKeys[i] < (zeitAktuell - 1000 * 60 * 60 * 24 * 7)){
            break
         }
      }

      //Werte um entsprechende Anzahl verkürzen
      werte = werte.slice(werte.length - anzahlWochenEintraege,werte.length )

 
      //URLs nach SecondLevelDomain bereinigen
      //  \/\/[a-zA-Z0-9.-]+
      //Regex Ausdruck, dass vom //nach http bis zum ersten Punk Matcht. Ist ok, man konnte die TopLevel Domain noch mit auslesen.
      //Durch Array Werte iterieren und das erste Element(URL) ändern
      
      for (var i = 0; i < werte.length; i++) {
         try{
            werte[i][0] = werte[i][0].match(/\/\/[a-zA-Z0-9.-]+/)[0];
         }catch{
            try{werte[i][0] = "";}catch{}
            
         }   
      }
      
      //Wenn möglich, Erste 2 Character jedes Strings, also das Doppel Slash löschen
      for (var i = 0; i < werte.length; i++) {
         try{
            werte[i][0] = werte[i][0].substring(2, werte[i][0].length);
         }catch{}
      }
      
      //Manuell die Einträge newtab entfernen
      for (var i = 0; i < werte.length; i++) {
         if(werte[i][0] == "newtab"){
            werte.splice(i, 1);
         }
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
      
      //Gesamtdauer berechnen
      var gesamtDauer = 0;
      for (const erg of ergebnisse){
         if(!(erg[1] == null)){
            gesamtDauer += (erg[1]/(1000*60))
         }
      }
     
      console.log("Gesamt")
      console.log(gesamtDauer)
      document.getElementById("dauer").innerHTML = gesamtDauer.toFixed(1) + " Min.";
           
      //Format der Dauer von Millisekunden auf Minuten anpassen
      for (var i = 0; i < ergebnisse.length; i++){
         ergebnisse[i][1] = ergebnisse[i][1] / (1000 * 60);
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
      theme: "light2", 
      title:{
         text: "Verwendete Seiten"
      },
      axisY: {
         title: "Minuten"
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
