var Documents;
dhtmlxEvent(window,"load",function(){
  Documents = newPrometList('docpages','Dokumente');
  Documents.Grid.destructor();
  Documents.Grid = Documents.Page.attachDataView({
	  container:"data_container",
		type:{
		  template:"<img src=#id#.jpg></img><br>#NAME#",
			height:100
		}
  });
  Documents.DataSource.FillGrid = function(aGrid,aFilter,aLimit,Callback) {
    var aDS = Documents.DataSource;
    var aURL = '/'+aDS.TableName+'/list.json';
    if (aFilter) {
      aURL+='?filter='+encodeURIComponent(aFilter);
    }
    if (aLimit) {
      aURL+='&limit='+aLimit;
    }
    aDS.loading = true;
    if (LoadData(aURL,function(aData){
      console.log("Data loaded");
      try {
        aGrid.clearAll();
        if ((aData)&&(aData.xmlDoc))
        var aData2;
        if (aData.xmlDoc.responseText != '')
          aData2 = JSON.parse(aData.xmlDoc.responseText);
        if (aData2) {
          for (var i = 0; i < aData2.length; i++) {
            var aRow = [];
            var aID = aData2[i].sql_id;
            aData2[i].id = aID;
            aGrid.add(aData2[i]);
            try {
              aDS.DataProcessor.setUpdated(aData2[i].sql_id);
            } catch(err) {}
          }
        }
        aDS.loading = false;
      } catch(err) {
        aDS.loading = false;
        console.log(aDS.TableName,'failed to load data !',err);
      }
      if (Callback)
        Callback();
    })==true) {
      console.log("Data loading...");
    }
    else {
      if (Callback)
        Callback();
      dhtmlx.message({
        type : "error",
        text: "Login erforderlich",
        expire: 3000
      });
    }
  }
});
