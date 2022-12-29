var IdentifiantCader = document.getElementById("IdentifiantCader");
var ProfessionOptions = document.getElementById("ProfessionOptions");
var motivationcader = document.getElementById("motivationcader");
var ChecboxForAll = document.getElementById("ChecboxForAll");
var ConfirmAdministratorAcountError = document.getElementById("ConfirmAdministratorAcountError");
var Class = document.getElementsByTagName("input");
var ImportSignature = document.getElementById("ImportSignature");
var Importbtn = document.getElementById("Importbtn");
var signatureCader = document.getElementById("signatureCader");
var Identification = document.getElementById("Identification");

function OnFocusConfirmStudentAcount(IdentifiantCaderForm, ProfessionOptionsForm, motivationcaderForm)
{
  /*print(ImportSignature.value);*/
  if(IdentifiantCaderForm == true)
  {
    IdentifiantCader.style.boxShadow = '0px 0px 3px 3px skyblue';
    ProfessionOptions.style.boxShadow = '0px 0px 2px 2px silver';
    motivationcader.style.boxShadow = '0px 0px 2px 2px silver';
    IdentifiantCader.style.color = '#376DAC';
    ProfessionOptions.style.color = '#000';
    motivationcader.style.color = '#000';
    Identification.style.borderColor = '#3789ac';
    IdentifiantCader.style.fontWeight = 'bold';
    ProfessionOptions.style.fontWeight = '';
    motivationcader.style.fontWeight = '';
    ConfirmAdministratorAcountError.style.animation = 'ConfirmAdministratorAcountErrorRAction 1s';
    ConfirmAdministratorAcountError.style.animationFillMode = 'forwards';
  }
  else if(ProfessionOptionsForm == true)
  {
    ProfessionOptions.style.boxShadow = '0px 0px 3px 3px skyblue';
    IdentifiantCader.style.boxShadow = '0px 0px 2px 2px silver';
    motivationcader.style.boxShadow = '0px 0px 2px 2px silver';
    IdentifiantCader.style.color = '#000';
    ProfessionOptions.style.color = '#376DAC';
    motivationcader.style.color = '#000';
    Identification.style.borderColor = '#3789ac';
    IdentifiantCader.style.fontWeight = '';
    ProfessionOptions.style.fontWeight = 'bold';
    motivationcader.style.fontWeight = '';
    ConfirmAdministratorAcountError.style.animation = 'ConfirmAdministratorAcountErrorRAction 1s';
    ConfirmAdministratorAcountError.style.animationFillMode = 'forwards';
  }
  else if(motivationcaderForm == true)
  {
    ProfessionOptions.style.boxShadow = '0px 0px 2px 2px silver';
    IdentifiantCader.style.boxShadow = '0px 0px 2px 2px silver';
    motivationcader.style.boxShadow = '0px 0px 3px 3px skyblue';
    IdentifiantCader.style.color = '#000';
    ProfessionOptions.style.color = '#000';
    Identification.style.borderColor = '#3789ac';
    motivationcader.style.color = '#376DAC';
    IdentifiantCader.style.fontWeight = '';
    ProfessionOptions.style.fontWeight = '';
    motivationcader.style.fontWeight = 'bold';
    ConfirmAdministratorAcountError.style.animation = 'ConfirmAdministratorAcountErrorRAction 1s';
    ConfirmAdministratorAcountError.style.animationFillMode = 'forwards';
  }
  else
  {
    IdentifiantCader.style.boxShadow = '0px 0px 2px 2px silver';
    ProfessionOptions.style.boxShadow = '0px 0px 2px 2px silver';
    motivationcader.style.boxShadow = '0px 0px 2px 2px silver';
    ProfessionOptions.style.color = '#000';
    motivationcader.style.color = '#000';
    IdentifiantCader.style.color = '#000';
    Identification.style.borderColor = '#3789ac';
    ProfessionOptions.style.fontWeight = '';
    motivationcader.style.fontWeight = '';
    IdentifiantCader.style.fontWeight = '';
  }
}

/*CheckedError*/
function CheckedErrorAdministratorAcount()
{
  if(IdentifiantCader.value == "")
  {
    IdentifiantCader.style.boxShadow = '0px 0px 3px 3px #ff007d';
    ConfirmAdministratorAcountError.style.animation = 'ConfirmAdministratorAcountErrorAction 1s';
    ConfirmAdministratorAcountError.style.animationFillMode = 'forwards';
    Identification.style.borderColor = '#ff007d';
  }
  else
  {
    IdentifiantCader.style.boxShadow = '0px 0px 2px 2px silver';
    ConfirmAdministratorAcountError.style.animation = 'ConfirmAdministratorAcountErrorRAction 1s';
    ConfirmAdministratorAcountError.style.animationFillMode = 'forwards';
    ProfessionOptions.style.color = '#000';
    motivationcader.style.color = '#000';
    IdentifiantCader.style.color = '#000';
    ProfessionOptions.style.fontWeight = '';
    motivationcader.style.fontWeight = '';
    IdentifiantCader.style.fontWeight = '';
    Identification.style.borderColor = '#3789ac';
    confirm("Est vous sure de vouloir confirner ces informations ?");
  }
}
/*CheckedClassOnchecbox*/
function CheckedAllClass()
{
  var index1;
  if(ChecboxForAll.checked)
  {
    for(index1 = 0; index1 < Class.length; index1++)
    {
      if(Class[index1].id == "class")
      {
         Class[index1].checked = "checked";
      }
    }
  }
  else
  {
    for(index1 = 0; index1 < Class.length; index1++)
    {
      if(Class[index1].id == "class")
      {
         Class[index1].checked = "";
      }
    }
  }
}

/*ImportBtnHover*/
function ImportBtnHover()
{
      Importbtn.style.boxShadow = '0px 3px 3px #b1b7ba';
      Importbtn.style.backgroundImage = 'linear-gradient(#10C2F6,#3cbaf4)';
}
/*ImportBtnHoverDown*/
function ImportBtnHoverDown()
{
      Importbtn.style.boxShadow = '0px 2px 1px #b1b7ba';
      Importbtn.style.backgroundImage = 'linear-gradient(#10C2F6,#3789ac)';
}
