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
});
