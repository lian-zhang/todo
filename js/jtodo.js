$ (document).ready(function(){
	var add=$(".add")
    var todos=[];
    var ul=$(".ul") 
//   显示
	if(localStorage.todos){
		todos=JSON.parse(localStorage.todos)
		render();
	}
//   添加li
     add.on("touchend",function(){
     	var input=$("input")
     	var v=input.val();
     	$.trim(v)
     	if(!v){
     		return;}
     	var todo={
     		name:v,
     		state:0
     	};
     	todos.push(todo);
     	localStorage.todos=JSON.stringify(todos);
     	render();
     	input.val("");
     })
     
    //   滑动
     var startpos;
     ul.on("touchstart","li",function(e){
     	startpos=e.originalEvent.changedTouches[0].clientX;
     	
     })
	 ul.on("touchend","li",function(e){
	 	var endpos=e.originalEvent.changedTouches[0].clientX;
	 	var index=$(this).index();
	 		
	 	 if(endpos-startpos>50){
	 		todos[index].state=1;		
	 		$(this).addClass("done");
	 	}
	  if(endpos-startpos<-50){
	 		todos[index].state=0;
	 		$(this).removeClass("done");
	 	}
	  localStorage.todos=JSON.stringify(todos)
	 })
//   删除
	var delete1=$(".del");
	var li=$(".ul li");
	ul.on("touchend",".del",function(){
	 	li=$(".ul li");
	 	delete1=$(".del");
	 	var index=delete1.index($(this));
	 	console.log(index)
	 	todos.splice(index,1)
	 	localStorage.todos=JSON.stringify(todos)
	 	li.eq(index).remove();
	  })
	function render(){
     	ul.empty();     	
     	for(var i=0;i<todos.length;i++){
     		var c=(todos[i].state)?"done":""
     		$("<li class='"+c+"'><div class='content'>"+todos[i].name+"</div><div class='del'>×</div></li>")
     		.appendTo(ul);
     	}
     }
	//    三个按钮
   
   
   
   var all=$(".all")
   var xxk=$(".xxk")
   var divs=$(".xxk div");
  xxk.on("touchend","div",function(){
  	var index=divs.index($(this))
  	divs.removeClass("active")
  	$(this).addClass("active")
   	var li=$(".ul li");
   	li.show();
   	if($(this).attr("data-role")=="com"){
   		var done=$("li:not(.done)")
   		done.hide()
   	}
   if($(this).attr("data-role")=="uncom"){
   		
   		var nodone=$(".done")
   		nodone.hide()
   	}
   })
   //清除所有完成
  var clear=$(".clearall")
  clear.on("touchend",function(){
  	var done=$(".done")
  	done.each(function(i){
  		$(this).delay(i*80).queue(function(){
  			$(this).addClass("dong1").dequeue()
  		}).delay(800).queue(function(){
  			$(this).remove().dequeue();
  		})
  	})
   var newarr=[];
   for(var i=0;i<todos.length;i++){
     	if(todos[i].state!==1){
     		newarr.push(todos[i])
     	}
     } 
     todos=newarr;
     localStorage.todos=JSON.stringify(todos)
  })	
});     