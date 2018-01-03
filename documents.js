var Documents;
dhtmlxEvent(window,"load",function(){
  Documents = newPrometList('docpages','Dokumente');
  Documents.Grid.destructor();
  Documents.Grid = Documents.Page.attachDataView({
	  container:"data_container",
		type:{
		  template:"<span class='dhx_strong'>#Maintainer#</span>#Package# <span class='dhx_light'>#Version#</span>",
			height:55
		}
  });
  Documents.FillGrid = function(aGrid,aFilter,aLimit,Callback) {
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
          aData2.id = aData2.sql_id;
            aGrid.add(aData2);
            try {
              aDS.DataProcessor.setUpdated(aData2[i].sql_id);
            } catch(err) {}
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
