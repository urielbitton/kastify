$(document).ready(function() {
   
var sidebarclick = false;    
var projname = '';    
var inf = 6000000;    
var thisprojid, thisclientid;    
var style = getComputedStyle(document.body);
var theme1 = style.getPropertyValue('--theme1'); 
var theme2 = style.getPropertyValue('--theme2'); 
var theme3 = style.getPropertyValue('--theme3'); 
var clientname;    
var resizeclients = false;    
     
    
$('.oneproject').html(localStorage.oneproject);          
$('.sideinner').html(localStorage.sideinner); 
$('.dashtable').html(localStorage.recenttasks);  
$('.clientboxcont').html(localStorage.clientboxcont);  
$('.oneclient').html(localStorage.oneclient);      
    
function saveProj() {
    setTimeout(function() {
        localStorage.oneproject = $('.oneproject').html();
        localStorage.projcont = $('.projcont').html();
        localStorage.sideinner = $('.sideinner').html();
        localStorage.recenttasks = $('.dashtable').html();
        localStorage.clientboxcont = $('.clientboxcont').html();
        localStorage.oneclient = $('.oneclient').html();
    },80)
}     
    
//date conversion func
function tableDate() {
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;
    return output;
}   
    
$('.navinner h4.activelink').css('color','var(--color)');
$('h4.activelink hr').css('opacity','1');
     
$('.navinner h4').on('click', function() {
    $('.navinner h4').css('color','');
    $('.navinner hr').css('opacity','');
    $(this).css('color','var(--color)');
    $(this).find('hr').css('opacity','1');
    $('.app').fadeOut(50);
});    
     
$('.clearmem').on('click', function() {
    localStorage.clear();
    location.reload();
});
    
$('.sideinner h5').on('click', function() {
    if($(this).find('.fa-angle-up').length) {
        $(this).siblings('div').fadeIn(100); 
        $(this).parent().find('.fa-angle-up').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    else {
        $(this).siblings('div').fadeOut(50);
        $(this).parent().find('.fa-angle-down').removeClass('fa-angle-down').addClass('fa-angle-up'); 
    }
});    
    

$('.newcont').on('click', function(e) {
    $('.newprojcont').remove();
    $('<div class="newprojcont"> <h4>New Project</h4> <input placeholder="Project title"> <button class="newprojbtn">Create Project</button> </div>').insertAfter($(this)); 
    e.stopImmediatePropagation();
    setTimeout(function() { 
        $('.newprojcont').fadeIn(0); 
        $('.newprojcont').find('input').focus();
        $('.newprojcont').css('top','70px');
    },50)
    $('.newprojcont input').on('keyup', function(e) {
        var enter = e.keyCode || e.which;
        if(enter == 13){
            $(this).siblings('button').trigger('click');
        }
    }); 
});
$(document).on('click','.newprojcont', function(e) {
    e.stopImmediatePropagation();
});    
$(document).on('click', function() {
    hideNewProjCont();
});       
    
function hideNewProjCont() {
    $('.newprojcont').fadeOut();
    $('.newprojcont').css('top','60px');
    setTimeout(function() { $('.newprojcont').remove(); },50)
}    
      
$(document).on('click','.newprojbtn', function() {
    if(!$('.newprojcont input').val()) {
        alert('Please provide a project title');
    } 
    else {
        projname = $(this).siblings('input').val();
        projid = projname.toLowerCase().replace(/[\s\W_]+/g,"");
        hideNewProjCont();
        $('[re-router=projects]').trigger('click');
        let randnum = Math.floor(Math.random() * 1000) + 1;
        //create projbox
        $('.projcont').append('<div class="projbox" re-router="'+projid+''+randnum+'"><i class="fas fa-ellipsis-h projoptions"></i><h4 class="projecttitle">'+projname+'</h4><h1><span class="totaltasksnum">0</span> tasks</h1> <small class="clientname">Client: No client</small><small>Updates: 0 new</small><small>High Priorities <span>0</span></small><div class="newdot"></div></div>');
        //create recent project
        if($('.recentprojcont small').length < 5) { 
            $('.recentprojcont').prepend('<small class="projecttitle" re-router="'+projid+''+randnum+'">'+projname+'</small>');
        }
        else {
            $('.recentprojcont small:last-child').remove();
            $('.recentprojcont').prepend('<small class="projecttitle" re-router="'+projid+''+randnum+'">'+projname+'</small>');
        }
        //create actual oneproject
        $('.oneproject').append('<div class="singleproj" re-route="'+projid+''+randnum+'"><div class="projtitles"> <h1>'+projname.substr(0,1).toLocaleUpperCase()+'</h1><div class="clear"></div><small>Project</small><div class="clear"></div><h6 class="projecttitle">'+projname+'</h6><i class="fas fa-heart favbtn"></i><div class="clear"></div><small class="clientname"></small><div class="clear"></div></div><button class="addtaskbtn"><i class="fas fa-plus"></i>Add Task</button><div class="clear"></div><div class="tablehead"><h4>Tasks</h4><small><span class="totaltasksnum">0</span> total</small><div class="tableactions"><i class="fas fa-copy"></i><i class="fas fa-arrows-alt"></i><i class="fas fa-trash trash"></i></div><div class="tablesort">Sort by<i class="fas fa-angle-down"></i></div><div class="tablefilter"><input placeholder="Filter tasks"></div><div class="tablesel"><span>Select</span><input class="selectall" type="checkbox"></div></div><table><tbody></tbody></table></div>'); 
        saveProj();
    } 
});     
$('.projcont').html(localStorage.projcont);     
        
$('.regrid').on('click', function() { 
    if(sidebarclick == false) {
        $('.appcont').css('grid-template-columns','50px auto');
        $('.sidebar h4 span, .sideinner, .logo span').fadeOut(0);
        $('.logo').css({'padding':'0','margin':'10px auto'});
        $('.navinner').css('margin-top','50px');
        $('.navinner h4').css('margin','10px auto');
        sidebarclick = true;   
    }
    else {
        $('.appcont').css('grid-template-columns','220px auto');
        $('.sidebar h4 span, .sideinner, .logo span').fadeIn(100);
        $('.logo').css({'padding':'','margin':''});
        $('.navinner').css('margin-top','');
        sidebarclick = false;
    }
});     
    
$(document).on('click','.projbox', function() {
    $('.app').fadeOut(0);
    $('.oneproject').fadeIn(50);
});
$(document).on('click','.sideinner [re-router]', function() {
    $('.app').fadeOut(0);
    $('.oneproject').fadeIn(50);
});     
       
$(document).on('click','.addtaskbtn', function() {
    let projtitle = $(this).parents('.singleproj').find('.projtitles .projecttitle').text();
    $(this).parents('.singleproj').find('table').append('<tr> <td class="tdgrip"><i class="fas fa-grip-horizontal grip"></i><small class="activestatus">Active</small></td><td class="tdtitle editable" placeholder="Task title"></td><td class="tdwords editable" placeholder="task description..."></td><td class="tdstatus"><span class="status-notstarted">Not Started</span></td><td class="tddate">'+tableDate()+'</td><td class="tdicons"><i class="fas fa-th detailsbtn"></i><i class="fas fa-bolt bolt"></i><input type="checkbox"></td><td class="tddetails"><div class="detailshead"><button>High Priority<i class="fas fa-star"></i></button><button>Low Priority<i class="fas fa-star"></i></button><small class="deletetask">Delete</small><i class="close"></i><div class="clear"></div></div><div class="detailsinner"><h2 class="tasktitle">Task title</h2><div class="detailsinfo"><ul><li><span>Project</span> <small class="projecttitle">'+projtitle+'</small></li><li><span>Date Due</span><small class="datechange"><input type="date" class="datepicker" value="'+tableDate()+'"></small></li><li><span>Status</span><small class="statusbox status-notstarted">Not Started</small></li><li><span>Notes</span><small contenteditable="true" placeholder="add notes to this task..."></small></li></ul></div><h3 class="updatestitle">Updates</h3><div class="updatescont"></div></div><div class="updatestatus"><textarea placeholder="Post an update..."></textarea><button class="addupdatebtn">Add Update</button></div></td></tr>'); 
    if($('.dashtable tr').length < 5) {
        $('<tr><td>Client name</td><td>Task title</td><td>Title description</td><td class="tdstatus"><span class="status-notstarted">Not Started</span></td><td class="tddate">July 22 2020</td><td><i class="fas fa-check-square"></i></td></tr>').prependTo('.dashtable tbody');
    } 
    else { 
        $('.dashtable tr:last-child').remove();
        $('<tr><td>Client name</td><td>Task title</td><td>Title description</td><td class="tdstatus"><span class="status-notstarted">Not Started</span></td><td class="tddate">July 22 2020</td><td><i class="fas fa-check-square"></i></td></tr>').prependTo('.dashtable tbody');
    }
    let that = $(this); 
    getTasksNum(that); 
    $('.editable').attr('contenteditable','true'); 
    $(".oneproject tbody").sortable({ 
        handle: '.tdgrip',
        cancel: '' 
    }); 
    saveProj();  
});        
    
function getTasksNum(that) {
    let totaltasksnum = that.parents('.singleproj').find('table tr').length;
    let thisprojid = that.parents('.singleproj').attr('re-route');
    $('[re-router='+thisprojid+'] .totaltasksnum, [re-route='+thisprojid+'] .totaltasksnum').html(totaltasksnum);
}     
      
$(".oneproject tbody").sortable({
    handle: '.tdgrip',
    cancel: ''
});     
    
$(document).on('mouseup','.tdgrip', function() {
    saveProj();
}); 
$(document).on('input','.oneproject td', function() {
    saveProj();
});  
$(document).on('input','.tdtitle', function() {
    let tasktitle = $(this).text(); 
    $(this).parents('tr').find('.tddetails .tasktitle').html(tasktitle);
});    
       
$(document).on('click','.oneproject .bolt', function() {
    if($(this).hasClass('activebolt')) {
        $(this).parents('table').find('tr').removeClass('activerow');
        $(this).removeClass('activebolt');
    }
    else {
        $(this).parents('table').find('tr').removeClass('activerow');
        $(this).parents('tr').addClass('activerow');
        $(this).addClass('activebolt');
        $('<small class="activestatus">Active</small>').insertAfter($(this).parents('tr').find('.detailshead button:last-child'));
    }
    saveProj(); 
});      
     
var mobclick = false;    
$('.mobbtn').on('click', function() {
    if(mobclick == false) {
        $('nav .right').fadeIn(50);
        setTimeout(function() {
            $('nav .right').css('top','70px');
        },50)
        mobclick = true;
    }
    else {
        $('nav .right').css('top','60px');
        setTimeout(function() {
          $('nav .right').fadeOut(50);  
        },50)
        mobclick = false;
    }
});     
    
$(document).on('click','.selectall', function() {
   $(this).parents('.singleproj').find('table [type=checkbox]').prop('checked', this.checked); 
});  
     
$(document).on('click','.tablehead .trash', function() {
    $(this).parents('.singleproj').find('table [type=checkbox]:checked').parents('tr').addClass('deleterow'); 
    let msg = '<p>Are you sure you want to delete the selected tasks?</p><button class="confirmdel">Delete</button>';
    dropNotif(msg,inf); 
});  
$(document).on('click','.confirmdel', function() {
    $('.deleterow').remove();
    $('.selectall').prop('checked',false);
    setTimeout(function() { $('.notifdiv .close').trigger('click'); },30)
    saveProj();
});    
    
//Table filter
$(document).on('keyup','.tablefilter input', function() {
    var value = $(this).val().toLowerCase();
    $(this).parents('.singleproj').find('table tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});  
//global search filter    
$(document).on('keyup','.mainsearch', function() {
    var value = $(this).val().toLowerCase();
    $('.appcont').find('table tr, .projbox').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});       
     
$(document).on('click','.detailsbtn', function(e) {
    $(this).parents('tr').find('.tddetails').fadeIn(20);
    $('.tddetails').css({'z-index':'510','right':''});
    var that = $(this);  
    setTimeout(function() {
       that.parents('tr').find('.tddetails').css({'right':'0','z-index':'550'});         
    },20)
    e.stopImmediatePropagation(); 
});    
    
$(document).on('click','.detailshead .close', function() {
    $('.tddetails').css('right','');
    setTimeout(function() {
        $('.tddetails').fadeOut(50);                
    },50)
});    
    
$(document).on('click','.addupdatebtn', function() {
    var updatetxt = $(this).siblings('textarea').val();
    $('<div class="singleupdate"><img src="images/pic.jpg"><h6>Uriel Bitton</h6><i>•</i><small>just now</small><p contenteditable="false">'+updatetxt+'</p><span class="editupdate">Edit</span><span class="delupdate">Delete</span></div>').prependTo($(this).parents('td').find('.updatescont'));
    $(this).siblings('textarea').val('');
    saveProj(); 
});     
    
$(document).on('click', function() {
    $(document).on('click','.tddetails', function(e) {
       e.stopImmediatePropagation(); 
    });
    $('.tddetails').css('right','');
    setTimeout(function() {
        $('.tddetails').fadeOut(50);                
    },50)
});    
    
$(document).on('click','.statusbox', function() {
    $('.statusdrop').remove();
    $('<div class="statusdrop"><small class="status-notstarted">Not Started</small><small class="status-done">Completed</small><small class="status-waiting">Waiting</small></div>').insertAfter($(this));
    $('.statusdrop').fadeIn(50); 
    setTimeout(function() {
        $('.statusdrop').css('left','200px'); 
    },50)
});     
    
$(document).on('click','.tdstatus, .tdgrip, .tddate', function(e) {
    $(this).parents('tr').find('.detailsbtn').trigger('click'); 
    e.stopImmediatePropagation();
}); 
   
    
$(document).on('click','.statusdrop small', function() {
    let status = $(this).attr('class');
    let statustxt = $(this).text();
    $(this).parents('.detailsinfo').find('.statusbox').removeClass().addClass('statusbox '+status);
    $(this).parents('.detailsinfo').find('.statusbox').text(statustxt);
    $(this).parents('tr').find('.tdstatus span').removeClass().addClass(status);
    $(this).parents('tr').find('.tdstatus span').text(statustxt);
    $('.statusdrop').fadeOut(50);
});     
    
$(document).on('click','.detailshead button:nth-of-type(1)', function() {
    if(!$(this).hasClass('highpriority') && !$(this).siblings('button').hasClass('lowpriority')) {
        $(this).addClass('highpriority');
        $('<i class="fas fa-star highstar"></i>').insertAfter($(this).parents('tr').find('.grip'));
    }
    else {
        $(this).removeClass('highpriority');
        $('.tdgrip .fa-star').remove();
    }
    saveProj();
});
$(document).on('click','.detailshead button:nth-of-type(2)', function() {
    if(!$(this).hasClass('lowpriority') && !$(this).siblings('button').hasClass('highpriority')) {
        $(this).addClass('lowpriority');
        $('<i class="fas fa-star lowstar"></i>').insertAfter($(this).parents('tr').find('.grip'));
    }
    else {
        $(this).removeClass('lowpriority');
        $('.tdgrip .fa-star').remove();
    }
    saveProj();
});    
    
$(document).on('click','.delupdate', function() {
    $(this).parents('.singleupdate').remove();
    let msg = '<p>Update post has been deleted.</p>';
    dropNotif(msg,5000);
    saveProj();
}); 
$(document).on('click','.editupdate', function() {
    $('<button class="saveedits">Save Changes<button><div class="clear"></div>').insertAfter($(this).next());
    $(this).siblings('p').attr('contenteditable','true');
    $(this).siblings('p').css('outline','1px solid #ddd');
});     
$(document).on('click','.saveedits', function() {
    $(this).fadeOut(0);
    $(this).siblings('p').attr('contenteditable','false');
    $(this).siblings('p').css('outline','');
    let msg = '<p>Update post has been edited</p>';
    dropNotif(msg,5000);
    saveProj();
});
    
$(document).on('click','.deletetask', function() {
    var that = $(this);
    that.parents('tr').addClass('deleterow');
    let msg = '<p>Are you sure you want to delete this task?</p><button class="confirmdel">Delete</button>';
    dropNotif(msg,inf); 
    getTasksNum(that);
});    
    
//notifications
function dropNotif(msg,time) {
    $('.notifdiv').remove();
    $('<div class="notifdiv"><i class="close"></i>'+msg+'</div>').appendTo('.home');
    setTimeout(function() { 
        $('.notifdiv').fadeIn(50);
        $('.notifdiv,.notifdiv p').css('transform','scaleX(1)'); 
    },50)
    setTimeout(function() { 
        $('.notifdiv,.notifdiv p').css('transform','');
        $('.notifdiv').fadeOut(150);
        setTimeout(function() { 
            $('.notifdiv').remove(); 
        },250) 
    },time)
}    
     
$(document).on('click','.notifdiv .close', function() {
    $('.notifdiv,.notifdiv p').css('transform','');
    setTimeout(function() { 
        $('.notifdiv').fadeOut(50);
        setTimeout(function() { 
            $('.notifdiv').remove(); 
        },150) 
    },100);
});     
//add favorite projects      
$(document).on('click','.singleproj .favbtn', function() {
    let thisprojid = $(this).parents('.singleproj').attr('re-route');
    let thisprojname = $(this).parents('.singleproj').find('.projecttitle').html();
    if(!$(this).hasClass('liked')) {
        $(this).css('color','var(--red)');
        $(this).addClass('liked');
        $('.favprojcont [re-router='+thisprojid+']').html('');
        $('.favprojcont .favprojs').prepend('<small re-router="'+thisprojid+'">'+thisprojname+'</small>');
        $('<i class="fas fa-heart"></i>').insertAfter($('[re-router='+thisprojid+'] .newdot'));
    }
    else {
        $(this).css('color','');
        $(this).removeClass('liked');
        $('[re-router='+thisprojid+'] .fa-heart').remove();
        $('.favprojcont [re-router='+thisprojid+']').html('');
        $('.favprojcont [re-router='+thisprojid+']').remove();
    }
    saveProj(); 
});     
//add favorite clients   
$(document).on('click','.singleclient .favbtn', function() {
    let thisclientid = $(this).parents('.singleclient').attr('re-route');
    let thisclientname = $(this).parents('.singleclient').find('.projecttitle').html();
    if(!$(this).hasClass('liked')) {
        $(this).css('color','var(--red)');
        $(this).addClass('liked');
        $('.favprojcont [re-router='+thisclientid+']').html('');
        $('.favprojcont .favclies').prepend('<small re-router="'+thisclientid+'">'+thisclientname+'</small>');
        $('<i class="fas fa-heart"></i>').insertAfter($('[re-router='+thisclientid+'] .newdot'));
    }
    else {
        $(this).css('color','');
        $(this).removeClass('liked');
        $('[re-router='+thisclientid+'] .fa-heart').remove();
        $('.favprojcont [re-router='+thisclientid+']').html('');
        $('.favprojcont [re-router='+thisclientid+']').remove();
    }
    saveProj(); 
});    
    
$(document).on('click','.projoptions', function(e) {
    $('.projoptcont').remove();
    $('<div class="projoptcont"><small class="optrename"><i class="fas fa-font"></i>Rename Project</small><small class="optdelete"><i class="fas fa-trash"></i>Delete Project</small></div>').insertAfter($(this));
    e.stopImmediatePropagation();
});     
$(document).on('click',function() {
    $('.projoptcont').remove();
    $('.clientoptcont').remove();
});    
    
$(document).on('click','.projoptcont .optrename', function(e) {
    $(this).parents('.projbox').find('.projecttitle').attr('contenteditable','true');
    $(this).parents('.projbox').find('.projecttitle').css('outline','1px solid var(--color)');
    $('<button class="projrenamebtn">Rename</button>').insertAfter($(this).parents('.projbox').find('.projecttitle'));
    $('.projoptcont').remove();
    e.stopImmediatePropagation();
    $(document).on('click','.projecttitle, .projrenamebtn', function(v) {
         v.stopImmediatePropagation();
    }); 
});    
$(document).on('click','.projrenamebtn', function() {
    $(this).parents('.projbox').find('.projecttitle').attr('contenteditable','false');
    $(this).parents('.projbox').find('.projecttitle').css('outline','');
    let newprojname = $(this).siblings('.projecttitle').text();
    let thisprojid = $(this).parents('.projbox').attr('re-router');
    $('[re-router='+thisprojid+'] .projecttitle,[re-route='+thisprojid+'] .projecttitle, .sideinner [re-router='+thisprojid+']').text(newprojname); 
    let firstletter = newprojname.substr(0,1);
    $('[re-route='+thisprojid+']').find('.projtitles h1').text(firstletter);
    $(this).remove();
    saveProj();
});    
   
$(document).on('click','.projoptcont .optdelete', function(e) {
    let thisprojname = $(this).parents('.projbox').find('.projecttitle').text();
    thisprojid = $(this).parents('.projbox').attr('re-router');
    let msg = '<i class="close"></i><p>Are you sure you want to delete project '+thisprojname+'?</p><button class="delproj">Delete</button>';
    dropNotif(msg,inf);
    e.stopImmediatePropagation();
});     
$(document).on('click','.delproj', function() {
    $('[re-router='+thisprojid+'], [re-route='+thisprojid+']').remove();
    $('.notifdiv,.notifdiv p').css('transform','');
    $('.notifdiv').fadeOut(150);
    setTimeout(function() { 
        $('.notifdiv').remove(); 
        saveProj();
    },250) 
    
});    
    
$(document).on('change','.datepicker', function() {
    $(this).parents('tr').find('.tddate').html($(this).val());
});
    
if($('.favinner small').length) {
    $('.sideinner > div > div').fadeIn(0);
}    
if($('.recentinner small').length) {
    $('.sideinner > div > div').fadeIn(0);
}    
        
 
//bar chart    
var barchart = new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    datasets: [{ 
        data: [41.0,21.0,32.4,45.7,40.59,32.0,43.3,41.5,22.0,33.1],
        label: "Projects",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: '#00b3ff'
      }, { 
        data: [32,15,30,21,5,50,43,76,23,12],
        label: "Clients",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: 'rgba(166, 0, 255,0.8)'  
      }, { 
        data: [40,3,1,20,45,50,62,35,10,22],
        label: "Completed Tasks",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: 'rgba(255, 81, 0,0.8)'  
      }
    ]   
  },      
  options: { 
    responsive:true,
    title: {
      display: true,
      text: 'Weekly Stats'
    } 
  }
});    
     
//pie chart    
var piechart = new Chart(document.getElementById("pie-chart"), {
  type: 'pie',
  data: {
    labels: ["Projects", "Clients", "Completed Tasks"],
    datasets: [{ 
      backgroundColor: [
        '#00b3ff',
        'rgba(166, 0, 255,0.8)',
        'rgba(255, 208, 0,0.8)',
      ],
      data: [12, 19, 17]
    }]
  },
    options: {
        responsive: true 
    }    
});        
    
//line chart        
var linechart = new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: ['8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm'],
    datasets: [{ 
        data: [12,14,15,7,8,13,16,7,18,21,23],
        label: "Tasks",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: 'rgba(255, 208, 0,0.8)'  
      }, { 
        data: [5,10,3,6,13,11,21,14,21,23,14],
        label: "Completed",
        borderColor: "#fafafa",
        fill: true,
        backgroundColor: 'rgba(255, 81, 0,0.8)'  
      } 
    ]   
  },      
  options: { 
    responsive:true,
    title: {
      display: true,
      text: 'Tasks Today'
    },
    scales: {
            xAxes: [{
               gridLines: {
                  color: '#ececec'
               }
            }],
            yAxes: [{
               gridLines: {
                  color: '#ececec'
               } 
            }],
       } 
  }
});     
     
   
//Kast Theme action
$('.themeswitch').on('change',function() {
    themeSwitch();
});    
    
function themeSwitch() {
    if($('.themeswitch').is(':checked')) {
        $('.logo img').attr('src','images/logoalt.png');
        $(':root').css('--color','#fea815');
        $(':root').css({'--color':'#fca816','--theme1':'#b57201','--theme2':'#ffc65f','--theme3':'#fee6b6'});
        $('.dashsmall:nth-of-type(4),.dashsmall:nth-of-type(3)').find('*').css('color','#555');
        barchart.data.datasets[0].backgroundColor = '#fca816';
        barchart.data.datasets[1].backgroundColor = '#b57201';
        barchart.data.datasets[2].backgroundColor = '#ffc65f';
        linechart.data.datasets[0].backgroundColor = '#ffc65f';
        linechart.data.datasets[1].backgroundColor = '#fee6b6';
        piechart.data.datasets[0].backgroundColor[0] = '#fea815';
        piechart.data.datasets[0].backgroundColor[1] = '#b57201';
        piechart.data.datasets[0].backgroundColor[2] = '#fee6b6';
        linechart.update(); 
        localStorage.kasttheme = true;
    }
    else {
        $('.logo img').attr('src','images/logo.png');
        $(':root').css({'--color':'','--theme1':'','--theme2':'','--theme3':''});
        $('.dashsmall:nth-of-type(4),.dashsmall:nth-of-type(3)').find('*').css('color','');
        linechart.update();
    }
}     

function checkPosition() {
    if (window.matchMedia('(max-width: 1350px)').matches) {
        $('.regrid').trigger('click');
    } 
    else {
        
    }
}    
checkPosition();    
    
$('.fullscreen').on('click', function() {
    let elem = document.documentElement;
    if($(this).hasClass('fullscreen')) {
        elem.requestFullscreen(); 
        $(this).removeClass('fullscreen');
    }
    else {
        document.exitFullscreen();
        $(this).addClass('fullscreen');
    }
    
});    
    
    
$('.invitebtn').on('click', function(e) {
    $('.invitecont').remove();
    $('<div class="invitecont"><h4>Add Client</h4><input required placeholder="E-mail"><small>Add a client with their email</small><input class="clientnameinp" placeholder="Client name"><small>Add client name</small><select></select><small>Choose a project to invite client</small><button class="addclientbtn">Invite</button></div>').insertAfter($('.sidebar'));
    $('.invitebtn').fadeIn(0);
    setTimeout(function() {
        $('.invitecont').css('left','230px');
        $('.clientnameinp').focus();
    },50) 
    let totalprojnum = $('.projbox').length;
    for(let i=1;i<=totalprojnum;i++) {
        $('.invitecont select').append('<option name="'+$('.projbox:nth-of-type('+i+')').find('.projecttitle').text()+'" value="'+$('.projbox:nth-of-type('+i+')').attr('re-router')+'">'+$('.projbox:nth-of-type('+i+')').find('.projecttitle').text()+'</option>');
    } 
    e.stopImmediatePropagation();    
    
});     
$(document).on('change','.clientnameinp', function() {
    clientname = $(this).val();
});         
$(document).on('click',function() {
    $('.invitecont').css('left','220px'); 
    $('.statusdrop').remove();
    setTimeout(function() {
        $('.invitecont').remove();
    },50)
});    
$(document).on('click','.tddetails',function() {
    $('.statusdrop').remove();
});
    
$(document).on('click','.invitecont, .statusdrop, .statusbox', function(e) {
    e.stopImmediatePropagation();
});    
     
$(document).on('click','.addclientbtn', function() {
    let randnum = Math.floor(Math.random() * 1000) + 1;
    let thisprojid = $(this).siblings('select').find('option:selected').val();
    let clientid = clientname.toLowerCase().replace(/[\s\W_]+/g,"");
    $('<div class="clientbox"><i class="fas fa-ellipsis-h clientopt"></i><i class="far fa-user"></i><h4 re-router="'+(clientid+randnum)+'">'+clientname+'</h4><h6 re-router="'+thisprojid+'">'+$(this).siblings('select').find('option:selected').attr('name')+'</h6></div>').appendTo($('.clientboxcont'));
    $('.invitecont').css('left','220px');
    $('[re-route='+thisprojid+'],[re-router='+thisprojid+']').find('.clientname').html(clientname);
    $('[re-route='+thisprojid+']').find('.projtitles .clientname').attr('re-router',(clientid+randnum)); 
    //add single client page
    $('<div class="singleclient" re-route="'+(clientid+randnum)+'"><div class="projtitles"><h1>'+clientname.substr(0,1)+'</h1><div class="clear"></div><small>Client</small><div class="clear"></div><h6 class="projecttitle">'+clientname+'</h6><i class="fas fa-heart favbtn"></i><div class="clear"></div></div></div>').appendTo($('.oneclient'));
    setTimeout(function() {
        $('.invitecont').remove();
    },50) 
    $('[re-router=clients]').trigger('click');
    saveProj();
}); 
     
$('.resizeboxes').on('click', function() {
    if(resizeclients == false) {
        $('.clientbox').css({'min-width':'130px','min-height':'100px','text-align':'center'});
        $('.clientbox').find('*').css('float','none');
        resizeclients = true;
    }
    else {
        $('.clientbox').css({'min-width':'','min-height':'','text-align':''});
        resizeclients = false;
    }
});    
     
$(document).on('click','.clientbox h6', function() {
    $('.app').fadeOut(0);
    $('.oneproject').fadeIn(30);
});    
$(document).on('click','.clientbox h4,.singleproj .clientname', function() {
    $('.app').fadeOut(0);
    $('.oneclient').fadeIn(30);
});     
    
    
$(document).on('click','.clientopt', function(e) {
    $('<div class="clientoptcont"><small class="optrename"><i class="fas fa-font"></i>Rename Project</small><small class="optdelete"><i class="fas fa-trash"></i>Delete Project</small></div>').insertAfter($(this));
    e.stopImmediatePropagation();
});    
       
$(document).on('click','.clientoptcont .optdelete', function(e) {
    let thisclientname = $(this).parents('.clientbox').find('h4').text();
    thisclientid = $(this).parents('.clientbox').find('h4').attr('re-router');
    let msg = '<i class="close"></i><p>Are you sure you want to delete client '+thisclientname+'?</p><button class="delclient">Delete</button>';
    dropNotif(msg,inf);
    e.stopImmediatePropagation();
});     
$(document).on('click','.delclient', function() {
    $('[re-router='+thisclientid+']').parents('.clientbox').remove();
    $('[re-route='+thisclientid+']').remove();
    $('.notifdiv,.notifdiv p').css('transform','');
    $('.notifdiv').fadeOut(150);
    setTimeout(function() { 
        $('.notifdiv').remove(); 
        saveProj();
    },250) 
}); 
    
$(document).on('click','.favclies small', function() {
    $('.app').fadeOut(0);
    $('.oneclient').fadeIn(50);
}); 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
     
    
    
});

//javascript
//calendar JS     
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('thecalendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth'
    });
calendar.render();
});