var libelecader = document.getElementById("libelecader");
var difficultycader = document.getElementById("difficultycader");
var descriptioncader = document.getElementById("descriptioncader");
var AddClassError = document.getElementById("AddClassError");
var AddClassError2 = document.getElementById("AddClassError2");
var AddClassError3 = document.getElementById("AddClassError3");

function OnFocusAddClass(libelecaderForm, difficultycaderForm, descriptioncaderForm)
{
   if(libelecaderForm == true)
   {
     libelecader.style.boxShadow = '0px 0px 3px 3px skyblue';
     difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
     descriptioncader.style.boxShadow = '0px 0px 2px 2px silver';
     libelecader.style.color = '#376DAC';
     difficultycader.style.color = '#000';
     descriptioncader.style.color = '#000';
     libelecader.style.fontWeight = 'bold';
     difficultycader.style.fontWeight = '';
     descriptioncader.style.fontWeight = '';
     AddClassError.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError.style.animationFillMode = 'forwards';
     AddClassError2.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError2.style.animationFillMode = 'forwards';
     AddClassError3.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError3.style.animationFillMode = 'forwards';
   }
   else if(difficultycaderForm == true)
   {
     libelecader.style.boxShadow = '0px 0px 2px 2px silver';
     difficultycader.style.boxShadow = '0px 0px 3px 3px skyblue';
     descriptioncader.style.boxShadow = '0px 0px 2px 2px silver';
     libelecader.style.color = '#000';
     difficultycader.style.color = '#376DAC';
     descriptioncader.style.color = '#000';
     libelecader.style.fontWeight = '';
     difficultycader.style.fontWeight = 'bold';
     descriptioncader.style.fontWeight = '';
     AddClassError.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError.style.animationFillMode = 'forwards';
     AddClassError2.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError2.style.animationFillMode = 'forwards';
     AddClassError3.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError3.style.animationFillMode = 'forwards';
   }
   else if(descriptioncaderForm == true)
   {
     libelecader.style.boxShadow = '0px 0px 2px 2px silver';
     difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
     descriptioncader.style.boxShadow = '0px 0px 3px 3px skyblue';
     libelecader.style.color = '#000';
     difficultycader.style.color = '#000';
     descriptioncader.style.color = '#376DAC';
     libelecader.style.fontWeight = '';
     difficultycader.style.fontWeight = '';
     descriptioncader.style.fontWeight = 'bold';
     AddClassError.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError.style.animationFillMode = 'forwards';
     AddClassError2.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError2.style.animationFillMode = 'forwards';
     AddClassError3.style.animation = 'ErrorAddClassRAction 1s';
     AddClassError3.style.animationFillMode = 'forwards';
   }
   else
   {
     libelecader.style.boxShadow = '0px 0px 2px 2px silver';
     difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
     descriptioncader.style.boxShadow = '0px 0px 2px 2px silver';
     libelecader.style.color = '#000';
     difficultycader.style.color = '#000';
     descriptioncader.style.color = '#000';
     libelecader.style.fontWeight = '';
     difficultycader.style.fontWeight = '';
     descriptioncader.style.fontWeight = '';
   }
}

/*ErrorLibelClass*/
function CheckedError()
{
  if(libelecader.value == "" && difficultycader.value == "")
  {
     libelecader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     difficultycader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     AddClassError3.style.animation = 'ErrorAddClassAction 1s';
     AddClassError3.style.animationFillMode = 'forwards';
  }
  else if(libelecader.value == "" && difficultycader.value != "")
  {
     libelecader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
     AddClassError.style.animation = 'ErrorAddClassAction 1s';
     AddClassError.style.animationFillMode = 'forwards';
  }
  else if(difficultycader.value == "" && libelecader.value != "")
  {
     difficultycader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     libelecader.style.boxShadow = '0px 0px 2px 2px silver';
     AddClassError2.style.animation = 'ErrorAddClassAction 1s';
     AddClassError2.style.animationFillMode = 'forwards';
  }
  else
  {
    libelecader.style.boxShadow = '0px 0px 2px 2px silver';
    AddClassError.style.animation = 'ErrorAddClassRAction 1s';
    AddClassError.style.animationFillMode = 'forwards';
    difficultycader.style.boxShadow = '0px 0px 2px 2px silver';
    AddClassError2.style.animation = 'ErrorAddClassRAction 1s';
    AddClassError2.style.animationFillMode = 'forwards';
    AddClassError3.style.animation = 'ErrorAddClassRAction 1s';
    AddClassError3.style.animationFillMode = 'forwards';
    libelecader.style.color = '#000';
    difficultycader.style.color = '#000';
    descriptioncader.style.color = '#000';
    libelecader.style.fontWeight = '';
    difficultycader.style.fontWeight = '';
    descriptioncader.style.fontWeight = '';
    confirm("Est vous sure de vouloir valider ces informations ?");
  }
}
