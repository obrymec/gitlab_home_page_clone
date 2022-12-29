var ClassOptionsSelect = document.getElementById("ClassOptionsSelect");

function OnFocusConfirmStudentAcount(ClassOptionsSelectForm)
{
  if(ClassOptionsSelectForm == true)
  {
    ClassOptionsSelect.style.boxShadow = '0px 0px 2px 2px skyblue';
    ClassOptionsSelect.style.color = '#376DAC';
    ClassOptionsSelect.style.fontWeight = 'bold';
  }
  else
  {
    ClassOptionsSelect.style.boxShadow = '0px 0px 2px 2px silver';
    ClassOptionsSelect.style.fontWeight = '';
    ClassOptionsSelect.style.color = '#000';
  }
}

/*Valide*/
function ConfirmInformationsAcount()
{
  ClassOptionsSelect.style.fontWeight = '';
  ClassOptionsSelect.style.color = '#000';
  confirm("Est vous sure de vouloir valider ces informations ?");
}
