"""실제 작업 치수와 카메라를 사용하는 작화용 구도 자료를 만든다."""
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
W, H = 1536, 864

def sub(a,b): return tuple(x-y for x,y in zip(a,b))
def dot(a,b): return sum(x*y for x,y in zip(a,b))
def cross(a,b): return (a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0])
def unit(a):
    n=math.sqrt(dot(a,a))
    return tuple(x/n for x in a)

def make(name,eye,target,fov,fallen=False):
    global W,H
    W,H=(1024,1536) if name=='collapse-wide' else (1536,864)
    forward=unit(sub(target,eye)); right=unit(cross(forward,(0,0,1))); up=cross(right,forward)
    focal=W/(2*math.tan(math.radians(fov/2)))
    image=Image.new('RGB',(W,H),'#c7d4df'); draw=ImageDraw.Draw(image)
    polygons=[]
    def project(p):
        relative=sub(p,eye); depth=dot(relative,forward)
        if depth<.35:return None
        return (W/2+focal*dot(relative,right)/depth,H/2-focal*dot(relative,up)/depth,depth)
    def face(points,color):
        projected=[project(p) for p in points]
        if any(p is None for p in projected):return
        polygons.append((sum(p[2] for p in projected)/len(projected),[(p[0],p[1]) for p in projected],color))
    def box(x,y,z,dx,dy,dz,color):
        p=[(x+dx*a,y+dy*b,z+dz*c) for a,b,c in [(0,0,0),(1,0,0),(1,1,0),(0,1,0),(0,0,1),(1,0,1),(1,1,1),(0,1,1)]]
        for indexes in [(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7),(4,5,6,7)]:face([p[i] for i in indexes],color)
    face([(-140,-140,0),(140,-140,0),(140,140,0),(-140,140,0)],'#858e72')
    if polygons:
        _,ground,color=polygons.pop()
        draw.polygon(ground,fill=color)
    else:
        draw.rectangle((0,int(H*.62),W,H),fill='#858e72')
    for i in range(72):
        a,b=2*math.pi*i/72,2*math.pi*(i+1)/72
        mid=(a+b)/2
        gate=abs(math.sin(mid))<.09
        breach=fallen and math.sin(mid)>.96
        if gate or breach:continue
        inner=[(46*math.cos(t),46*math.sin(t),z) for t,z in [(a,0),(b,0),(b,10),(a,10)]]
        outer=[(50*math.cos(t),50*math.sin(t),z) for t,z in [(a,0),(b,0),(b,10),(a,10)]]
        face(inner,'#c8c5b7');face(outer,'#a4a59f');face([inner[2],inner[3],outer[3],outer[2]],'#dfddcf')
    for x,y in [(-30,-30),(20,-30),(-30,22),(20,22)]:box(x,y,0,10,8,5,'#b9b3a3')
    def tower_point(r,t,z):
        if fallen:return (r*math.cos(t),z*.996+r*math.sin(t)*.087,8+z*.087-r*math.sin(t)*.996)
        return (r*math.cos(t),r*math.sin(t),z)
    levels=[(0,8),(12,5),(60,4)]
    for (z1,r1),(z2,r2) in zip(levels,levels[1:]):
        for i in range(8):
            a,b=2*math.pi*i/8,2*math.pi*(i+1)/8
            face([tower_point(r1,a,z1),tower_point(r1,b,z1),tower_point(r2,b,z2),tower_point(r2,a,z2)],'#d8cfb9' if i%2 else '#b9aa90')
    if fallen:
        box(6,43,0,2,2,3,'#4ac8ef')
    else:box(-1,-1,60,2,2,5,'#4ac8ef')
    people=[(13,-6,'#2073b2'),(16,-4,'#79365e'),(15,-2,'#75497e'),(18,-4,'#b88c31'),(43,6,'#463a8e'),(44,9,'#463a8e')]
    if fallen:
        people=[(8.4,43.2,'#2073b2'),(10,-10,'#79365e'),(8,-12,'#75497e'),(12,-11,'#b88c31')]
        if name=='collapse-wide':people=[(14,-4,'#2073b2'),(10,-10,'#79365e'),(8,-12,'#75497e'),(12,-11,'#b88c31')]
        if name=='gate-reverse':people.append((52,0,'#37543c'))
    for x,y,color in people:
        box(x-.23,y-.16,0,.46,.32,1.25,color);box(x-.22,y-.18,1.25,.44,.36,.45,'#e3bb91')
    for _,points,color in sorted(polygons,reverse=True):draw.polygon(points,fill=color,outline='#464d52',width=2)
    font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',22)
    if name!='collapse-wide':
        draw.rectangle((0,0,W,45),fill='#102335')
        draw.text((16,10),f'{name} | human 1.7m | wall 10m | tower 65m | enclosure diameter 100m',font=font,fill='white')
    image.save(ROOT/(name+'.png'))
    return dict(name=name,eye=eye,target=target,horizontalFov=fov,fallen=fallen,units='meters',people=people)

records=[make('intact-ground',(32,-18,1.6),(8,3,4),68),make('collapse-wide',(100,-135,120),(0,10,0),35,True),make('crystal-ground',(15,32,1.4),(6,44,3),75,True),make('allies-reverse',(8.4,42,1.7),(11,-10,1),60,True),make('gate-reverse',(8.4,43.2,1.7),(50,0,1),65,True)]
(ROOT/'cameras.json').write_text(json.dumps(records,indent=2)+'\n',encoding='utf-8')
