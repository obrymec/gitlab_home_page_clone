var identifycader = document.getElementById("identifycader");
var passwordcader = document.getElementById("passwordcader");
var LoginError1 = document.getElementById("LoginError1");
var LoginError2 = document.getElementById("LoginError2");
var LoginError3 = document.getElementById("LoginError3");

function OnFocusLogin(identifycaderForm, passwordcaderForm)
{
   if(identifycaderForm == true)
   {
     identifycader.style.boxShadow = '0px 0px 3px 3px skyblue';
     passwordcader.style.boxShadow = '0px 0px 2px 2px silver';
     identifycader.style.color = '#376DAC';
     passwordcader.style.color = '#000';
     identifycader.style.fontWeight = 'bold';
     passwordcader.style.fontWeight = '';
     LoginError1.style.animation = 'ErrorLoginRAction 1s';
     LoginError1.style.animationFillMode = 'forwards';
     LoginError2.style.animation = 'ErrorLoginRAction 1s';
     LoginError2.style.animationFillMode = 'forwards';
     LoginError3.style.animation = 'ErrorLoginRAction 1s';
     LoginError3.style.animationFillMode = 'forwards';
   }
   else if(passwordcaderForm == true)
   {
     identifycader.style.boxShadow = '0px 0px 2px 2px silver';
     passwordcader.style.boxShadow = '0px 0px 3px 3px skyblue';
     passwordcader.style.color = '#376DAC';
     identifycader.style.color = '#000';
     passwordcader.style.fontWeight = 'bold';
     identifycader.style.fontWeight = '';
     LoginError1.style.animation = 'ErrorLoginRAction 1s';
     LoginError1.style.animationFillMode = 'forwards';
     LoginError2.style.animation = 'ErrorLoginRAction 1s';
     LoginError2.style.animationFillMode = 'forwards';
     LoginError3.style.animation = 'ErrorLoginRAction 1s';
     LoginError3.style.animationFillMode = 'forwards';
   }
   else
   {
     identifycader.style.boxShadow = '0px 0px 2px 2px silver';
     passwordcader.style.boxShadow = '0px 0px 2px 2px silver';
     identifycader.style.color = '#000';
     passwordcader.style.color = '#000';
     identifycader.style.fontWeight = '';
     passwordcader.style.fontWeight = '';
   }
}

/*ErrorLogin*/
function CheckedErrorLogin()
{
  if(identifycader.value == "" && passwordcader.value == "")
  {
     identifycader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     passwordcader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     LoginError3.style.animation = 'ErrorLoginAction 1s';
     LoginError3.style.animationFillMode = 'forwards';
     identifycader.style.color = '#000';
     passwordcader.style.color = '#000';
  }
  else if(identifycader.value == "" && passwordcader.value != "")
  {
     identifycader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     passwordcader.style.boxShadow = '0px 0px 2px 2px silver';
     LoginError1.style.animation = 'ErrorLoginAction 1s';
     LoginError1.style.animationFillMode = 'forwards';
     identifycader.style.color = '#000';
     passwordcader.style.color = '#000';
  }
  else if(identifycader.value != "" && passwordcader.value == "")
  {
     passwordcader.style.boxShadow = '0px 0px 3px 3px #ff007d';
     identifycader.style.boxShadow = '0px 0px 2px 2px silver';
     LoginError2.style.animation = 'ErrorLoginAction 1s';
     LoginError2.style.animationFillMode = 'forwards';
     identifycader.style.color = '#000';
     passwordcader.style.color = '#000';
  }
  else
  {
    identifycader.style.boxShadow = '0px 0px 2px 2px silver';
    LoginError1.style.animation = 'ErrorLoginRAction 1s';
    LoginError1.style.animationFillMode = 'forwards';
    passwordcader.style.boxShadow = '0px 0px 2px 2px silver';
    LoginError2.style.animation = 'ErrorLoginRAction 1s';
    LoginError2.style.animationFillMode = 'forwards';
    LoginError3.style.animation = 'ErrorLoginRAction 1s';
    LoginError3.style.animationFillMode = 'forwards';
    identifycader.style.color = '#000';
    passwordcader.style.color = '#000';
    identifycader.style.fontWeight = '';
    passwordcader.style.fontWeight = '';
  }
}
