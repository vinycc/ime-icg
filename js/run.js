/*  
    UNIVERSIDADE DE SÃO PAULO -->
    INSTITUTO DE MATEMÁTICA E ESTATÍSTICA -->
    Desenvolvimento de Sistemas Web para Apoio ao Ensino/Aprendizagem -->
    11355021 - Paulo Viniccius Vieira -->
*/

var ACC;
var linhaInst;
var colunaInst;
var X=0;
var EPI = 0;
var instructionList;
var entrada = "";


function LoadAssembly() 
{ 
  //$("textarea#textAreaExecutavel").val("0-2\n199\n0-3\n198\n099\n112\n098\n212\n197\n000");

  //$("textarea#textAreaExecutavel").val("0-1\n199\n0-0\n198\n099\n133\n0-2\n134\n033\n334\n613\n0-1\n914\n0-0\n133\n433\n618\n929\n098\n133\n0-1\n233\n198\n099\n133\n0-1\n233\n199\n904\n898\n000");


  ACC = "";
  linhaInst = "";
  colunaInst = "";
  X=0;
  EPI = 0;
  instructionList = "";
  entrada = "";

  for (i =0 ; i < 10; i++){
    for (j = 0; j<10; j++){
      $("#mem" + i + j).html("00000");
      document.getElementById("mem" + i + j ).bgColor = '#f8f9fa';
    }
  }

  $('#textAreaExecutavel').highlightWithinTextarea({
    //highlight: instructionList[inst]
    highlight: [0]
  });

  
}



function SelectExample(){

  LoadAssembly();
  

  if ($( "#comboExemplos" ).val() == "ex01"){
    $("textarea#textAreaCompilador").val("a = 2;\nb = 3;\nc = a + b;\nescreva(c);");
    $("textarea#textAreaExecutavel").val("0-2\n199\n0-3\n198\n099\n113\n098\n213\n197\n897\n000");
  }else if ($( "#comboExemplos" ).val() == "ex02"){
    $("textarea#textAreaCompilador").val("leia(n);\nfat = 1;\ncont = 1;\nenquanto(cont <= n){\n    fat = fat * cont;\n    cont = cont + 1;\n}\nescreva(fat);");



    $("textarea#textAreaExecutavel").val("799\n0-1\n198\n0-1\n197\n097\n136\n099\n137\n036\n337\n614\n0-1\n915\n0-0\n136\n436\n619\n932\n098\n136\n097\n137\n036\n437\n198\n097\n136\n0-1\n236\n197\n905\n898\n000");
  }else{
    $("textarea#textAreaExecutavel").val("");
  }
  
  
}

/*
Comandos: 
0EE: AC <- cEE
1EE: EE <- cAC
2EE: AC <- cAC + cEE
3EE: AC <- cAC - cEE
4EE: AC <- cAC * cEE
5EE: AC <- cAC / cEE
6EE: se cAC>0, faça EPI <- EE
7EE: leia valor e guarde em EE
8EE: escreva o valor em EE
9EE: EPI <- EE
0-N: AC <- N, sendo N inteiro
000: final de execução
*/


function inputValue(){

  
  var n = $("#Entrada").val();
  intN = parseInt(n);
  if (Number.isInteger(intN)){
    entrada = intN
    
  }else{
    alert('Erro. Favor inserir um valor válido.');
  }
}


function stop(){

  $('#divMEM').unblock();
  $('#divASM').unblock(); 
  $('#divSaida').unblock(); 
  $('#divConsole').unblock(); 
  $('#divAcumulador').unblock(); 
  
}


function DecodeInstruction(instruction)
{
  // 0-N: AC <- N, sendo N inteiro
  if (instruction.startsWith("0-"))
  {
    $("#Instrucao").val('AC <- N');
    ACC = instruction.split("-")[1];
    $("#Acumulador").val(ACC);
  }

  // 000: Final de Execução
  else if (instruction.startsWith("00"))
  {
    //Fim
    $("#Instrucao").val('Final da Execução');
  }

  // 0EE: AC <- cEE
  else if (instruction.startsWith("0"))
  {
    $("#Instrucao").val('AC <- cEE');
    var linha = instruction.substring(1,2);
    var coluna = instruction.substring(2);
    ACC = $("#mem" + linha + coluna).html();
    $("#Acumulador").val(ACC);
  }

  // 1EE: EE <- cAC
  else if (instruction.startsWith("1"))
  {
    $("#Instrucao").val('EE <- cAC');
    var linha1 =  instruction.substring(1, 2);
    var coluna1 = instruction.substring(2);

    var id = linha1.toString() + coluna1.toString();
    
    $("#mem" + id).html(ACC.toString());
    document.getElementById("mem" + id).bgColor = '#ccffe2';
  }

  // 2EE: AC <- cAC + cEE
  else if (instruction.startsWith("2"))
  {
    $("#Instrucao").val('AC <- cAC + cEE');
    var linha = instruction.substring(1,2);
    var coluna = instruction.substring(2);
    ACC =  parseInt(ACC) + parseInt( $("#mem" + linha + coluna).html() );
    $("#Acumulador").val(ACC);
  }

  // 3EE: AC <- cAC - cEE
  else if (instruction.startsWith("3"))
  {
    $("#Instrucao").val('AC <- cAC - cEE');
    var linha = instruction.substring(1,2);
    var coluna = instruction.substring(2);
    ACC = parseInt(ACC) - parseInt( $("#mem" + linha + coluna).html() );
    $("#Acumulador").val(ACC);
  }

  // 4EE: AC <- cAC * cEE
  else if (instruction.startsWith("4"))
  {
    $("#Instrucao").val('AC <- cAC * cEE');
    var linha = instruction.substring(1,2);
    var coluna = instruction.substring(2);
    ACC = parseInt(ACC) * parseInt( $("#mem" + linha + coluna).html() );
    $("#Acumulador").val(ACC);
  }

  // 5EE: AC <- cAC / cEE
  else if (instruction.startsWith("5"))
  {
    $("#Instrucao").val('AC <- cAC / cEE');
    var linha = instruction.substring(1,2);
    var coluna = instruction.substring(2);
    ACC = parseInt(ACC) / parseInt( $("#mem" + linha + coluna).html() );
    ACC = Math.floor(ACC);
    $("#Acumulador").val(ACC);
    
  }

  // 6EE: se cAC > 0, faça EPI <- EE
  else if (instruction.startsWith("6"))
  {
    $("#Instrucao").val('se cAC > 0, faça EPI <- EE');
    ACC = parseInt(ACC);
    if (ACC > 0){
      var linha = instruction.substring(1,2);
      var coluna = instruction.substring(2);
      EPI = parseInt(linha + coluna);
      //EPI = parseInt( $("#mem" + linha + coluna).html());
      return true;
    }
  }

  // 7EE: leia valor e guarde em EE
  else if (instruction.startsWith("7"))
  {
  

      $("#Instrucao").val('Leia valor e guarde em EE');
      var entrada = $("#Entrada").val();

      var linha =  instruction.substring(1, 2);
      var coluna = instruction.substring(2);
      var id = linha.toString() + coluna.toString();
      $("#mem" + id).html(entrada.toString());

      document.getElementById("mem" + id).bgColor = '#ccffe2';
    
  }

  // 8EE: Escreve valor de EE
  else if (instruction.startsWith("8"))
  {
    $("#Instrucao").val('Escreve valor de EE');
    var linha = instruction.substring(1,2);
    var coluna = instruction.substring(2);
    var saida = parseInt( $("#mem" + linha + coluna).html());
    $("#Saida").val(saida);

  }

  // 9EE: EPI <- EE
  else if (instruction.startsWith("9"))
  {
    $("#Instrucao").val('EPI <- EE');
    var linha = instruction.substring(1,2);
    var coluna = instruction.substring(2);
    EPI = parseInt(linha + coluna);
    //EPI = parseInt( $("#mem" + linha + coluna).html());
    return true;
  }

  return false;

}

function Emulate() 
{ 
  if ($("#mem00").html() == "00000"){
    var r = confirm("O programa não está carregado na memória, deseja atualizar?");
    if (r == false){
      return;
    }else{

     UpdateMemory();
    }
  }

  if ($.trim($("#textAreaExecutavel").val()) != "") {
    var myProgram = $("#textAreaExecutavel").val();
    instructionList = myProgram.split("\n");

    // Enquanto nao for final
    while ( ! instructionList[EPI].startsWith("00")){

      if (instructionList[EPI].startsWith("7")){
        var v = prompt("Favor inserir o valor de entrada", "");
        while (v == null || v == ""){
          var v = prompt("Favor inserir o valor de entrada", "");
        }
      
        entrada = parseInt(v);
        $("#Entrada").val(entrada);
      }

      desvio = DecodeInstruction(instructionList[EPI]);
      if (desvio == false){
        //incrementa endereço de instrução em uma unidade se nao houve desvio
        EPI = EPI + 1;
      }
    }

  }
  return false;
    

  
}

function NextStep(inst)
{
  desvio = DecodeInstruction(instructionList[inst]);

  $('#textAreaExecutavel').highlightWithinTextarea({
    //highlight: instructionList[inst]
    highlight: [inst*4, inst*4 + 3]
  });

  return desvio;

}

function EmulateStepByStep() 
{ 
  if ($("#mem00").html() == "00000"){
    var r = confirm("O programa não está carregado na memória, deseja atualizar?");
    if (r == false)
    {
      return
    }else{
      UpdateMemory();
    }
  }


  //alert(EPI);
  if (EPI == 0){
    if ($.trim($("#textAreaExecutavel").val()) != "") {
      var myProgram = $("#textAreaExecutavel").val();
      instructionList = myProgram.split("\n");
    }
  }


  if (instructionList[EPI].startsWith("7")){
    // Entrada
    if (entrada != ""){
      printMemory(EPI);
      desvio = NextStep(EPI);
      if (desvio == false){
        //incrementa endereço de instrução em uma unidade se nao houve desvio
        EPI = EPI + 1;
      }
    } 
    else{
      alert('Erro. Favor inserir o valor de entrada.');
    }
  }else{

    printMemory(EPI);
    desvio = NextStep(EPI);
    if (desvio == false){
      //incrementa endereço de instrução em uma unidade se nao houve desvio
      EPI = EPI + 1;
    }
  }

}

function printMemory(EPI){
  if (EPI < 10){
    if (document.getElementById("mem0" + EPI).bgColor == '#ccffe2'){
      //muda pra escuro
      document.getElementById("mem0" + EPI).bgColor = '#80ffb7';
    } else{
      //muda pra claro
      document.getElementById("mem0" + EPI).bgColor = '#ccffe2';
    }

  }else{
    s = EPI.toString();
    if (document.getElementById("mem" + s.substring(0,1) + s.substring(1,2) ).bgColor == '#ccffe2'){
      //muda pra escuro
      document.getElementById("mem" + s.substring(0,1) + s.substring(1,2) ).bgColor = '#80ffb7';
    } else{
      //muda pra claro
      document.getElementById("mem" + s.substring(0,1) + s.substring(1,2) ).bgColor = '#ccffe2';
    }
  } 
}

function UpdateMemory()
{
  linhaInst = 0;
  colunaInst = 0;

  if ($.trim($("#textAreaExecutavel").val()) != "") {
    var myProgram = $("#textAreaExecutavel").val();
    var instructions = myProgram.split("\n");

    for (i = 0; i < instructions.length; i++) {
      var id = linhaInst.toString() + colunaInst.toString();
      $("#mem" + id).html(instructions[i]);
      document.getElementById("mem" + id).bgColor = '#ffffd4';
      colunaInst = colunaInst + 1;
      if (colunaInst > 9){
        colunaInst  = 0;
        linhaInst = linhaInst + 1;
      }
    }
  }

  // limpa o campo de entrada
  $("#Entrada").val("");
}
