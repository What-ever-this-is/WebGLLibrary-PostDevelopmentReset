//APP
import CATS from "../../js/main.js";

function $(name,parent){
    return parent?{
        tag:parent.getElementsByTagName(name),
        class:parent.getElementsByClassName(name)
    } : {
        id:document.getElementById(name),
        tag:document.getElementsByTagName(name),
        class:document.getElementsByClassName(name)
    }
}
var render,scene,camera,mymesh,mymesh2,mymesh4,mymesh3,mymaterial,mymaterial2,packagedmesh,mylight,mylight2,mytexture;
var keybinds = {
    KeyW:false,
    KeyA:false,
    KeyS:false,
    KeyD:false,
    KeyQ:false,
    KeyE:false,
    ArrowUp:false,
    ArrowDown:false,
    ArrowRight:false,
    ArrowLeft:false
}
//Hopefully this code will be less than 100 lines with the library.
//Code has been reset
function changeFOV(me){
    scene.setFOV(parseInt(me.value))
    $("fovvalue").id.innerHTML = me.value
}

async function preload(callback){
    await CATS.CORE.loadMesh("./models/susan.json","vertices","faces","normals",["texturecoords",0],["meshes",0],$("amogus").id).then((data)=>{
        mymesh=data;
        console.log(mymesh.texCoords);
        mymesh.rotate([90,0,0])
        mymesh.flipTCoordinate()
        console.log(mymesh.texCoords)
        var mymaterial = new CATS.TexturedMaterial($("amogus").id,3,CATS.CORE.enum.PHONG_LIGHTING)
        mymesh.setMaterial(mymaterial)
        console.log(data)
    })
    callback()
}

function mathdebug(){
    var myquat = new CATS.Quaternion(0,1,0,1);
    console.log(myquat);
    console.log(myquat.returnRotationMatrix())
    console.log(myquat.toEulerAngles())
    var myquat2 = CATS.Quaternion.fromEulerAngles([0,5,3])
    var myquat3 = new CATS.Quaternion( -0.596973, 0.0423342, -0.7991367, -0.0566707 )
    console.log(myquat2)
    console.log(myquat2.toEulerAngles())
    console.log(myquat3.toEulerAngles())
}

function main(){
    mathdebug()
    $("date").id.innerText = new Date()
    //Wow now that's a lot of code gone.
    render = new CATS.Renderer($("emotionalDamage").id)
    document.onkeydown = function(e){
        keybinds[e.code] = true;
    }
    document.onkeyup = function(e){
        keybinds[e.code] = false;
    }
    scene = new CATS.Scene(render)
    scene.setBackground("#000000")
    mymaterial = new CATS.SingleColorMaterial("#ff0000",10)
    mymesh = new CATS.Cube(3,mymaterial)
    mymesh2 = new CATS.Plane(3,mymaterial)
    mylight = new CATS.DirectionalLight([10,0],0.8)
    mylight2 = new CATS.AmbientLight(20,"#FFFFFF")
    var myquat = new CATS.Quaternion(0,0,0,1)
    mymesh.rotate([0,0,0])
    scene.addLight(mylight)
    scene.addLight(mylight2)
    var mymeshid = scene.addObject(mymesh)
    //var mymeshid2 = scene.addObject(mymesh2)
    //scene.objects[mymeshid2].translate([0,2,0])
    //scene.objects[mymeshid].translate([0,-2,0])
    scene.objects[mymeshid].setRotation(myquat,CATS.CORE.enum.QUATERNION)
    console.log(scene.objects[mymeshid].transform.rotation.euler)
    scene.moveCamera([0,0,5])
    function cat(){
       scene.objects[mymeshid].rotate([0,0,3])
    scene.render()
    if(keybinds.KeyW){
        scene.moveCamera([0,0,-0.1])
    } else if(keybinds.KeyS){
        scene.moveCamera([0,0,0.1])
    }
    if(keybinds.KeyA){
        scene.moveCamera([-0.1,0,0])
    } else if(keybinds.KeyD){
        scene.moveCamera([0.1,0,0])
    }
    if(keybinds.KeyQ){
        scene.moveCamera([0,0.1,0])
    } else if(keybinds.KeyE){
        scene.moveCamera([0,-0.1,0])
    }
    if(keybinds.ArrowUp){
        scene.rotateCamera([-2,0,0])
    } else if(keybinds.ArrowDown){
        scene.rotateCamera([2,0,0])
    }
    if(keybinds.ArrowLeft){
        scene.rotateCamera([0,-2,0])
    } else if(keybinds.ArrowRight){
        scene.rotateCamera([0,2,0])
    }
    requestAnimationFrame(cat)
    }
    cat()
}
window.onload = function(){
    preload(main);
};