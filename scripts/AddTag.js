var libelcader = document.getElementById("libelcader");
var CoefficientCader = document.getElementById("CoefficientCader");
var difficultycader = document.getElementById("difficultycader");
var AddTagError1 = document.getElementById("AddTagError1");
var AddTagError2 = document.getElementById("AddTagError2");
var AddTagError3 = document.getElementById("AddTagError3");
var AddTagError4 = document.getElementById("AddTagError4");
var AddTagError5 = document.getElementById("AddTagError5");
var AddTagError6 = document.getElementById("AddTagError6");
var AddTagError7 = document.getElementById("AddTagError7");
var checkTag = document.getElementById("checkTag");
var Class = document.getElementsByTagName("input");

function OnFocusAddTag(libelcaderForm, CoefficientCaderForm, difficultycaderForm)
{
   if(libelcaderForm == true)
   {
     libelcader.style.boxShadow = '0px 0px 3px 3px skyblue';
     CoefficientCader.style.boxShadow = '0px 0px 2px 2px silver';
     difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
     libelcader.style.color = '#376DAC';
     CoefficientCader.style.color = '#000';
     difficultycader.style.color = '#000';
     libelcader.style.fontWeight = 'bold';
     CoefficientCader.style.fontWeight = '';
     difficultycader.style.fontWeight = '';
     AddTagError1.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError1.style.animationFillMode = 'forwards';
     AddTagError2.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError2.style.animationFillMode = 'forwards';
     AddTagError3.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError3.style.animationFillMode = 'forwards';
     AddTagError4.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError4.style.animationFillMode = 'forwards';
     AddTagError5.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError5.style.animationFillMode = 'forwards';
     AddTagError6.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError6.style.animationFillMode = 'forwards';
     AddTagError7.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError7.style.animationFillMode = 'forwards';
   }
   else if(CoefficientCaderForm == true)
   {
     libelcader.style.boxShadow = '0px 0px 2px 2px silver';
     CoefficientCader.style.boxShadow = '0px 0px 3px 3px skyblue';
     difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
     CoefficientCader.style.color = '#376DAC';
     libelcader.style.color = '#000';
     difficultycader.style.color = '#000';
     libelcader.style.fontWeight = '';
     CoefficientCader.style.fontWeight = 'bold';
     difficultycader.style.fontWeight = '';
     AddTagError1.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError1.style.animationFillMode = 'forwards';
     AddTagError2.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError2.style.animationFillMode = 'forwards';
     AddTagError3.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError3.style.animationFillMode = 'forwards';
     AddTagError4.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError4.style.animationFillMode = 'forwards';
     AddTagError5.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError5.style.animationFillMode = 'forwards';
     AddTagError6.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError6.style.animationFillMode = 'forwards';
     AddTagError7.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError7.style.animationFillMode = 'forwards';
   }
   else if(difficultycaderForm == true)
   {
     libelcader.style.boxShadow = '0px 0px 2px 2px silver';
     CoefficientCader.style.boxShadow = '0px 0px 2px 2px silver';
     difficultycader.style.boxShadow = '0px 0px 3px 3px skyblue';
     libelcader.style.color = '#000';
     CoefficientCader.style.color = '#000';
     difficultycader.style.color = '#376DAC';
     libelcader.style.fontWeight = '';
     CoefficientCader.style.fontWeight = '';
     difficultycader.style.fontWeight = 'bold';
     AddTagError1.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError1.style.animationFillMode = 'forwards';
     AddTagError2.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError2.style.animationFillMode = 'forwards';
     AddTagError3.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError3.style.animationFillMode = 'forwards';
     AddTagError4.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError4.style.animationFillMode = 'forwards';
     AddTagError5.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError5.style.animationFillMode = 'forwards';
     AddTagError6.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError6.style.animationFillMode = 'forwards';
     AddTagError7.style.animation = 'ErrorAddTagRAction 1s';
     AddTagError7.style.animationFillMode = 'forwards';
   }
   else
   {
     libelcader.style.boxShadow = '0px 0px 2px 2px silver';
     CoefficientCader.style.boxShadow = '0px 0px 2px 2px silver';
     difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
     libelcader.style.fontWeight = '';
     CoefficientCader.style.fontWeight = '';
     difficultycader.style.fontWeight = '';
     CoefficientCader.style.color = '#000';
     libelcader.style.color = '#000';
     difficultycader.style.color = '#000';
   }
}

/*ErrorTag*/
function CheckedError()
{
  if(libelcader.value == "" && CoefficientCader.value == "" && difficultycader.value == "")
  {
     libelcader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     CoefficientCader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     difficultycader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     AddTagError1.style.animation = 'ErrorAddTagAction 1s';
     AddTagError1.style.animationFillMode = 'forwards';
  }
  else if(libelcader.value != "" && CoefficientCader.value == "" && difficultycader.value == "")
  {
    libelcader.style.boxShadow = '0px 0px 2px 2px silver';
    CoefficientCader.style.boxShadow = '0px 0px 3px 3px #ff007d';
    difficultycader.style.boxShadow = '0px 0px 3px 3px #ff007d';
    AddTagError2.style.animation = 'ErrorAddTagAction 1s';
    AddTagError2.style.animationFillMode = 'forwards';
  }
  else if(libelcader.value == "" && CoefficientCader.value != "" && difficultycader.value == "")
  {
    libelcader.style.boxShadow = '0px 0px 2px 2px #ff007d';
    CoefficientCader.style.boxShadow = '0px 0px 2px 2px silver';
    difficultycader.style.boxShadow = '0px 0px 3px 3px #ff007d';
    AddTagError3.style.animation = 'ErrorAddTagAction 1s';
    AddTagError3.style.animationFillMode = 'forwards';
  }
  else if(libelcader.value == "" && CoefficientCader.value == "" && difficultycader.value != "")
  {
    libelcader.style.boxShadow = '0px 0px 2px 2px #ff007d';
    CoefficientCader.style.boxShadow = '0px 0px 3px 3px #ff007d';
    difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
    AddTagError4.style.animation = 'ErrorAddTagAction 1s';
    AddTagError4.style.animationFillMode = 'forwards';
  }
  else if(libelcader.value == "" && CoefficientCader.value != "" && difficultycader.value != "")
  {
    libelcader.style.boxShadow = '0px 0px 2px 2px #ff007d';
    CoefficientCader.style.boxShadow = '0px 0px 2px 2px silver';
    difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
    AddTagError5.style.animation = 'ErrorAddTagAction 1s';
    AddTagError5.style.animationFillMode = 'forwards';
  }
  else if(libelcader.value != "" && CoefficientCader.value == "" && difficultycader.value != "")
  {
    libelcader.style.boxShadow = '0px 0px 2px 2px silver';
    CoefficientCader.style.boxShadow = '0px 0px 3px 3px #ff007d';
    difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
    AddTagError6.style.animation = 'ErrorAddTagAction 1s';
    AddTagError6.style.animationFillMode = 'forwards';
  }
  else if(libelcader.value != "" && CoefficientCader.value != "" && difficultycader.value == "")
  {
    libelcader.style.boxShadow = '0px 0px 2px 2px silver';
    CoefficientCader.style.boxShadow = '0px 0px 2px 2px silver';
    difficultycader.style.boxShadow = '0px 0px 2px 2px #ff007d';
    AddTagError7.style.animation = 'ErrorAddTagAction 1s';
    AddTagError7.style.animationFillMode = 'forwards';
  }
  else
  {
    libelcader.style.boxShadow = '0px 0px 2px 2px silver';
    difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
    CoefficientCader.style.boxShadow = '0px 0px 2px 2px silver';
    AddTagError1.style.animation = 'ErrorAddTagRAction 1s';
    AddTagError1.style.animationFillMode = 'forwards';
    AddTagError2.style.animation = 'ErrorAddTagRAction 1s';
    AddTagError2.style.animationFillMode = 'forwards';
    AddTagError3.style.animation = 'ErrorAddTagRAction 1s';
    AddTagError3.style.animationFillMode = 'forwards';
    AddTagError4.style.animation = 'ErrorAddTagRAction 1s';
    AddTagError4.style.animationFillMode = 'forwards';
    AddTagError5.style.animation = 'ErrorAddTagRAction 1s';
    AddTagError5.style.animationFillMode = 'forwards';
    AddTagError6.style.animation = 'ErrorAddTagRAction 1s';
    AddTagError6.style.animationFillMode = 'forwards';
    AddTagError7.style.animation = 'ErrorAddTagRAction 1s';
    AddTagError7.style.animationFillMode = 'forwards';
    libelcader.style.fontWeight = '';
    CoefficientCader.style.fontWeight = '';
    difficultycader.style.fontWeight = '';
    CoefficientCader.style.color = '#000';
    libelcader.style.color = '#000';
    difficultycader.style.color = '#000';
    confirm("Est vous sure de vouloir valider ces informations ?");
  }
}

/*CheckedTag*/
function CheckedTag()
{
  var index2;
  if(checkTag.checked)
  {
    for(index2 = 0; index2 < Class.length; index2++)
    {
      if(Class[index2].id == "checkClass")
      {
         Class[index2].checked = "checked";
      }
    }
  }
  else
  {
    for(index2 = 0; index2 < Class.length; index2++)
    {
      if(Class[index2].id == "checkClass")
      {
         Class[index2].checked = "";
      }
    }
  }
}
