let tate=4,yoko=4,s,dirn;
let a=new Array(yoko);
for(let i=0;i<yoko;i++)	a[i]=new Array(tate);
let rowe=3,cole=3;
let command=[],step=0;

function setup(){
	createCanvas(windowWidth,windowHeight);

	randomset();	//ランダム

	textAlign(CENTER,CENTER);
	textSize(30);
	
	solve();

	//noLoop();
}

function draw(){
	background(220);
	
	fill(100);
	rect(0,0,400,400);

	let x=[0,1,0,-1];
	let y=[-1,0,1,0];
	let speed=25;

	if(frameCount%speed==0){
		move(command[step]);
		step++;	
	}

	if(command[step]=='up')	dirn=0;
	if(command[step]=='right')	dirn=1;
	if(command[step]=='down')	dirn=2;
	if(command[step]=='left')	dirn=3;

	for(let i=0;i<yoko;i++)	for(let j=0;j<tate;j++)	if(a[j][i]!=16){
		let dx=0,dy=0;


		fill(255);
		if(rowe+y[dirn]==j&&cole+x[dirn]==i){
			dx=-x[dirn]*map((frameCount%speed),0,speed,0,1);
			dy=-y[dirn]*map((frameCount%speed),0,speed,0,1);
		}
		stroke(0);
		rect((i+dx)*100,(j+dy)*100,100);
		fill(0);
		noStroke();
		text(a[j][i],(i+dx)*100+50,(j+dy)*100+50);
	}
	

	
	
}

/*function mouseMoved(){
	let c,r;
	if(mouseX<100*yoko&&mouseY<100*tate){
		
		c=int(mouseY/100);
		r=int(mouseX/100);
		
		let x=[0,1,0,-1],y=[1,0,-1,0];
		for(let i=0;i<4;i++){
			if(inn(c+x[i],r+y[i])){
				if(a[c+x[i]][r+y[i]]==yoko*tate){
					a[c+x[i]][r+y[i]]=a[c][r];
					a[c][r]=yoko*tate;
					break;
				}
			}
		}
	}
}*/


function move(dir){
	if(dir=='up'){
		a[rowe][cole]=a[rowe-1][cole];
		a[rowe-1][cole]=16;
		rowe--;
	}
	if(dir=='down'){
		a[rowe][cole]=a[rowe+1][cole];
		a[rowe+1][cole]=16;
		rowe++;
	}
	if(dir=='left'){
		a[rowe][cole]=a[rowe][cole-1];
		a[rowe][cole-1]=16;
		cole--;
	}
	if(dir=='right'){
		a[rowe][cole]=a[rowe][cole+1];
		a[rowe][cole+1]=16;
		cole++;
	}
}

function inn(c,r){
	if(r>=0&&r<tate&&c>=0&&c<yoko)	return true;
	else	return false;
}

function randomset(){

	for(let i=0;i<4;i++)	for(let j=0;j<4;j++)	a[i][j]=i*4+j+1;
	rowe=3,cole=3;
	let dtem=-1;
	for(let k=0;k<400;){
		let dir=int(random(4));
		let x=[0,1,0,-1],y=[-1,0,1,0];
		if(rowe+y[dir]>=0&&rowe+y[dir]<4&&cole+x[dir]>=0&&cole+x[dir]<4&&dir!=(dtem+2)%4){
			a[rowe][cole]=a[rowe+y[dir]][cole+x[dir]];
			a[rowe+y[dir]][cole+x[dir]]=16;
			rowe+=y[dir];
			cole+=x[dir];
			dtem=dir;
			k++;
		}
	}


}

function solve(){
	let target;
	let r,c,re,ce,rec,cec;
	let acopy=new Array(4);

	for(let i=0;i<4;i++)	acopy[i]=a[i].concat();
	
	for(let i=0;i<4;i++){
		let tem=a[i].indexOf(16);
		if(tem!=-1){
			re=i;
			ce=tem;
		}
		
	}

	setnum(1,0,0);
	setnum(2,0,1);
	if(acopy[0][2]!=3||acopy[0][3]!=4){
		setnum(4,0,2);
		if(re==0&&ce==3)	compush('down');
		if(acopy[0][3]==3){
			swap(0);
		}else{
			setnum(3,1,2);
			comp(0);
		}
	}

	setnum(5,1,0);
	setnum(6,1,1);
	if(acopy[1][2]!=7||acopy[1][3]!=8){
		setnum(8,1,2);
		if(re==1&&ce==3)	compush('down');
		if(acopy[1][3]==7){
			swap(1);
		}else{
			setnum(7,2,2);
			comp(1);
		}
	}
	
	if(acopy[2][0]!=9||acopy[3][0]!=13){
		setnum(13,2,0);
		if(re==3&&ce==0)	compush('right');
		if(acopy[3][0]==9){
			swap2(0);
		}else{
			setnum(9,2,1);	
			comp2(0);
		}
	}

	setnum(14,2,1);
	if(re==3&&ce==1)	compush('right');
	if(acopy[3][1]==10){
		swap2(1);
	}else{
		setnum(10,2,2);
		comp2(1);
	}

	if(re==3)	compush('up');
	if(ce==3)	compush('left');

	if(acopy[3][2]==11&&acopy[3][3]==15){
		compush('down');
		compush('right');
	}else if(acopy[3][2]==15&&acopy[3][3]==12){
		compush('right');
		compush('down');
	}else{
		compush('right');
		compush('down');
		compush('left');
		compush('up');
		compush('right');
		compush('down');
	}


	function setnum(target,rg,cg){
		for(let i=0;i<4;i++){
			let tem=acopy[i].indexOf(target);
			if(tem!=-1){
				r=i;
				c=tem;
			}
		}

		if(c>cg)	left(c-cg);
		if(c<cg)	right(cg-c);
		if(r>rg)	up(r-rg);

	}

	function compush(dir){
		command.push(dir);
		if(dir=='up'){
			acopy[re][ce]=acopy[re-1][ce];
			acopy[re-1][ce]=16;
			re--;
		}
		if(dir=='down'){
			acopy[re][ce]=acopy[re+1][ce];
			acopy[re+1][ce]=16;
			re++;
		}
		if(dir=='left'){
			acopy[re][ce]=acopy[re][ce-1];
			acopy[re][ce-1]=16;
			ce--;
		}
		if(dir=='right'){
			acopy[re][ce]=acopy[re][ce+1];
			acopy[re][ce+1]=16;
			ce++;
		}

	}


	function left(n){
		for(let k=0;k<10;k++){
			if(re==r&&ce==c-1&&r!=3)	break;
			
			if(r==3){
				if(re==r-1&&ce==c){
					compush('down');
					r--;
				}else{
					if(ce<c-1)	compush('right');
					else{
						if(re<r-1)	compush('down');
						if(re>r-1)	compush('up');
						if(re==r-1){
							if(ce<c)	compush('right');
							if(ce>c)	compush('left');
						}
					}
				}
			}else{
				if(ce<c-1){
					if(re<r)	compush('down');
					else	compush('right');
				}
				if(ce==c-1){
					if(re<r)	compush('down');
					if(re>r)	compush('up');
				}
				if(ce>=c){
					if(re==r)	compush('down');
					else	compush('left');
				}
			}

		}

		for(let i=0;i<n;i++){
			compush('right');
			if(i<n-1){
				compush('down');
				compush('left');
				compush('left');
				compush('up');
			}
		}

		c-=n;
	}

	function right(n){
		for(let k=0;k<10;k++){
			if(re==r&&ce==c+1&&r!=3)	break;
			
			if(r==3){
				if(re==r-1&&ce==c){
					compush('down');
					r--;
				}else{
					if(re<r-1)	compush('down');
					if(re>r-1)	compush('up');
					if(re==r-1){
						if(ce<c)	compush('right');
						if(ce>c)	compush('left');
					}
				}
			}else{
				if(ce>c+1){
					if(re<r)	compush('down');
					else	compush('left');
				}
				if(ce==c+1){
					if(re<r)	compush('down');
					if(re>r)	compush('up');
				}
				if(ce<=c){
					if(re==r)	compush('down');
					else	compush('right');
				}
			}

		}

		for(let i=0;i<n;i++){
			compush('left');
			if(i<n-1){
				compush('down');
				compush('right');
				compush('right');
				compush('up');
			}
		}

		c+=n;
	}

	function up(n){
		for(let k=0;k<20;k++){
			if(re==r-1&&ce==c)	break;

			if(re<r-1)	compush('down');
			if(re==r-1){
				if(ce<c)	compush('right');
				if(ce>c)	compush('left');
			}
			if(re>=r){
				if(ce>c)	compush('up');
				else if(re==r)	compush('down');
				else	compush('right');
			}
		}

		for(let i=0;i<n;i++){
			compush('down');
			if(i<n-1){
				compush('right');
				compush('up');
				compush('up');
				compush('left');
			}
		}

		r-=n;
	}

	function swap(rg){
		for(let k=0;k<10;k++){
			if(re==rg+1&&ce==2)	break;
			if(re>rg+1)	compush('up');
			if(ce<2)	compush('right');
			if(ce>2)	compush('left');
		}

		compush('up');
		compush('right');
		compush('down');
		compush('left');
		compush('down');
		compush('right');
		compush('up');
		compush('up');
		compush('left');
		compush('down');
		compush('right');
		compush('down');
		compush('left');
		compush('up');
		compush('up');
		compush('right');
		compush('down');
	}

	function swap2(n){
		for(let k=0;k<10;k++){
			if(re==3&&ce==n+1)	break;
			if(re<3)	compush('down');
			if(ce>n+1)	compush('left');
		}

		compush('left');
		compush('up');
		compush('right');
		compush('down');
		compush('right');
		compush('up');
		compush('left');
		compush('left');
		compush('down');
		compush('right');
		compush('up');
		compush('right');
		compush('down');
		compush('left');
		compush('left');
		compush('up');
		compush('right');

	}

	function comp(rg){
		for(let k=0;k<10;k++){
			if(re==rg&&ce==3)	break;
			
			if(ce==3)	compush('up');
			else if(re==rg+1)	compush('down');
			else	compush('right');
		}

		compush('left');
		compush('down');
	}

	function comp2(n){
		for(let k=0;k<10;k++){
			if(re==3&&ce==n)	break;
			if(re==2)	compush('down');
			else	compush('left');
		}

		compush('up');
		compush('right');
	}

}