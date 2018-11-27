"use strict";
/*
Mitzi Bustamante
November 14 2018
CISC 131
When the box is being clicked it creates a random amount of "confetti".
Once it is clicked again the bottom of the box disappears and the confetti falls.
*/
window.onload =function ()
{
document.onclick=function(){createConfetti("confetti", 1000);}
create;
}
function trim(data)
{
	//This function trims the white spaces
	var end; //declaration for the end of the word
	var result; //declaration
	var start; //declaration for the start of the word
	var whitespace; //declaration for the whitespace characters
	if (typeof data === "string")
		{
			whitespace=" \n\r\t\f";
			start=0;
			while (start<data.length && whitespace.indexOf(data.charAt(start))>=0)
			{
				start=1+start;
			}
			end=data.length-1;
			while (end>=0 && whitespace.indexOf(data.charAt(end))>=0)
			{
				end=end-1;
			}
			if (end<start)
			{
				result="";
			}
			else
			{
				result=data.substring(start,end+1);
			}
		}
		else
		{
		result=data;
		}
return result;
}
function getRandomInteger (upperLimit)
{
	//This function gets a random number
	return Math.floor(Math.random()*(upperLimit+1));
}
function getRandomRGB()
{
	//This function gets a random RGB color
	var result;
	result="rgb(";
	result=result+getRandomInteger (255)+",";
	result=result+getRandomInteger (255)+",";
	result=result+getRandomInteger (255)+")";
	return result;
}
function createHTMLElement (elementType,id,classInfo,content)
{
	//This function creates a new HTML element using the appropriate info (elementType,id,classInfo,content)
if (elementType===null)
{
 elementType="";
}
else
{
	elementType=trim(elementType);
}
if (id===null)
{
 id="";
}
else
{
	id=trim(id);
	if (id.length>0)
	{
	 id=' id="'+id+'"';
	}
}
if (classInfo===null)
{
 classInfo="";
}
else
{
	classInfo=trim(classInfo);
	if (classInfo.length>0)
	{
	 classInfo=' class="'+classInfo+'"';
}
}
return ('<'+ elementType +id + classInfo +'>' + content + '</'+ elementType + '>');
}
function createConfetti (containerId, howMany)
{
	//	This function creates the "confetti" inisde the box, gives it a random color and place it in a random place
	var ball; //declaration for the confetti
	var contains; // declaration
	var i; //declaration
	var result; //declaration
	i=0;
	result="";
	while (i< howMany )
	{
			result=result+createHTMLElement('span', "confetti"+i, 'confetti', '&bull;');
			i=i+1;
	}
	contains=document.getElementById(containerId);
	contains.innerHTML=result;
	i=i-1;
	while (i>=0)
	{
		ball=document.getElementById("confetti"+i);
		ball.style.color = getRandomRGB();
		ball.style.top = getRandomInteger(confetti.offsetHeight-ball.offsetHeight-4)+'px';
		ball.style.left = getRandomInteger(confetti.offsetWidth-ball.offsetWidth-4)+'px';
		i=i-1;
	}
	document.onclick=function() {window.setInterval(makeConfettiFall())};
}
function create()
{
	//This function asked the user to input number, and checks if it's a positive, if it's negative it'll keep asking until you input a positive number
	var howMany;// declaration
	howMany=Number(window.prompt("Enter a number"));
	while (howMany < 0)
	{
		howMany=Number(window.prompt("Enter a number"));
	}
	createConfetti("confetti", howMany);
}
function getNumbericPrefix(data)
{
	// This function get only the numeric prefix from data
	var digits; //declaration of the numbers
	var i; //declaration
	var j; //declaration
	var result; //declaration
	digits="-.1234567890";
	result="";
	i=0;
	j=0;
	if(data.length>0)
	{
		while ((digits.indexOf(data.charAt(i)) >= 0 || (data.charAt(i) == '+' && i==0)) && i<data.length)// when the data start with any of the digit greater and equal to zero or when data equals "+" and i = 0 go through the loop
		{
			if((data.charAt(i)) != digits.charAt(0) || j == 0)
			{
			 result=result+data.charAt(i);
		 	}
		 	if(data.charAt(i) == digits.charAt(0))
		 	{
				if(j!=0)
				{
					i=data.length;
				}
				else
				{
					j=j+1;
				}
			}
			 i=i+1;
		}

	}

	if (result.length == 0)
	{
		result="0";
	}
return Number(result);
}
function move(prefix, leftBoundary, rightBoundary, maxSideMovement, maxDownMovement)
{
	//this function makes it able for the confetti to move
var id; //declaration
var i; //declaration
var left; //declaration for the confetti style left
var top; //declration for the confetti style top
var x; //declaration
i=0;
id=document.getElementById(prefix+i);
while (id !== null)
{

	top=getNumbericPrefix(id.style.top);
	left=getNumbericPrefix(id.style.left);
	x=getRandomInteger(1);
	if(x===0)
	{
		left=left+getRandomInteger(maxSideMovement);
	}
	else
	{
		left=left-getRandomInteger(maxSideMovement);
	}
	top=top+getRandomInteger(maxDownMovement)+'px';
	id.style.top=top;
	left=Math.min(left, (rightBoundary-20));
	left=Math.max(left, leftBoundary);
	id.style.left=left+'px';
	i=i+1;
	id=document.getElementById(prefix+i);
}
id=document.getElementById(prefix+i);
}
function makeConfettiFall()
{
	//this function makes the confetti fall
	var container; //declaration for the box
	var i;  //declaration
	container=document.getElementById("confetti");
	i=0;
	container.style.borderBottom="white";
	while(i<100)
	{
		window.setTimeout(function() {move("confetti", 0, confetti.offsetWidth-15, 5,10)},(i*100));
		i=i+1;
	}
	document.onclick=null;
}
