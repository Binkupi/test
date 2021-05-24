// JavaScript Document

var csdl=require('./../../config/db/index');
module.exports.select= async function (maloai)
{
	var chuoi='SELECT * from hoa where maloai='+maloai;
	 var dshoa = await csdl.DocBang(chuoi);
	var kq="<table width='100%' align='center' >";
	for(i=0;i<dshoa.length;i++)
	 {
		   if(i%3==0)
			   kq=kq+"<tr>";
			   kq=kq+"<td><a href='/detail/"+ dshoa[i].mahoa+"'><img src='/images/"+dshoa[i].hinh+"'></a><br>Tên hoa :"+dshoa[i].tenhoa +"<br>Giá bán :"+dshoa[i].dongia+"</td>";
			   if((i+1)%3==0)
			   kq=kq+"</tr>";
			   
			   
		}
		 
		 kq=kq+"</table";
		 return kq;
	}
module.exports.selectChitiet= async function (mahoa)
{
	var chuoi='SELECT * from hoa where mahoa='+mahoa;
	
	  var dshoa = await csdl.DocBang(chuoi);
	
	
	var kq="<table width='100%' align='center' >";
	for(i=0;i<dshoa.length;i++)
	 {
		  
			   kq=kq+"<tr>";
			   kq=kq+"<td><img src='/images/"+dshoa[i].hinh+"'></td><td>Tên hoa :"+dshoa[i].tenhoa +"<br>Giá bán :"+dshoa[i].dongia+"<br>Mô Tả :"+dshoa[i].mota+"<br><a href='/"+dshoa[i].maloai+"'>Về Trang Chủ</a></td>";
			   
			   kq=kq+"</tr>";
			 break;  
			   
		}
		 
		 kq=kq+"</table";
		 return kq;
	}
	
	module.exports.selectFind= async function (tenhoa)
{
	var chuoi="SELECT * from hoa where tenhoa like'%"+tenhoa +"%' or mota like '%"+tenhoa+"%'";
	
	  var dshoa = await csdl.DocBang(chuoi);
	
	
	var kq="<table width='100%' align='center' >";
	for(i=0;i<dshoa.length;i++)
	 {
		  if(i%2==0)
		   kq=kq+"<tr>";
			   kq=kq+"<td width='50%'><table width='100%'><tr>";
			   kq=kq+"<td><img src='/images/"+dshoa[i].hinh+"'></td><td>Tên hoa :"+dshoa[i].tenhoa +"<br>Giá bán :"+dshoa[i].dongia+"<br>Mô Tả :"+dshoa[i].mota+"<br><a href='/"+dshoa[i].maloai+"'>Về Trang Chủ</a></td></tr></table></td>";
			if((i+1)%2==0)
			 kq=kq+"</tr>";
		 
			   
		}
		 
		 kq=kq+"</table";
		 return kq;
	}