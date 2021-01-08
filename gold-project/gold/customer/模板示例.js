<div class="sl-zx-tb1  sl-zx-tb-ys2" style="{{cellborder}}">
 <div class="sl-zx-tb2 sl-zx-cell">{{sname}}</div>
  <div class="sl-zx-tb3 sl-zx-cell bid{{configid}}">0.00</div>
  <div class="sl-zx-tb3 sl-zx-cell ask{{configid}}">0.00</div>
  <div class="sl-zx-tb3 sl-zx-cell">
    <div class="sl-zx-tb4 max{{configid}}">0.00</div>
    <div class="sl-zx-tb4 min{{configid}}">0.00</div>
  </div>
</div>


<li style="width:100%;background-color:{{cellbackcolor}};" id="group{{groupId}}">
<div class="sl-zx-list-t " style="height: {{height}}rem;{{font}}"><span id="customerName">{{groupName}}</span></div>


<div class="sl-zx-tb1  sl-zx-tb-ys2" style="{{cellborder}}">
 <div class="sl-zx-tb2 sl-zx-cell">{{sname}}</div>
  <div class="sl-zx-tb3 sl-zx-cell bid{{configid}}">0.00</div>
  <div class="sl-zx-tb3 sl-zx-cell ask{{configid}}">0.00</div>
<div class="sl-zx-tb3 sl-zx-cell">  
<div style="height:2rem;line-height:2rem;">
 <label onclick="changeevent.buyWaterAdd({{configid}},{{conLen}})" class="tj-label">+</label>
 <input old="{{buyBackWater}}" onchange="changeevent.valueChanged(this,{{configid}},1,{{conLen}})"  type="text" id="buyBackWater{{configid}}" value="{{buyBackWater}}" class="tj-input" style="color:{{defTextColor}};background-color:{{cellBackColor}}">
 <label  onclick="changeevent.buyWaterSal({{configid}},{{conLen}})" class="tj-label" >-</label></div>
<div style="height:2rem;line-height:2rem;">
  <label  onclick="changeevent.saleWaterAdd({{configid}},{{conLen}})" class="tj-label">+</label>
  <input old="{{saleWater}}" onchange="changeevent.valueChanged(this,{{configid}},2,{{conLen}})" type="text" id="saleWater{{configid}}" value="{{saleWater}}" class="tj-input" style="color:{{defTextColor}};background-color:{{cellBackColor}}">
  <label  onclick="changeevent.saleWaterSal({{configid}},{{conLen}})" class="tj-label">-</label></div></div>
</div>

<div class="sj-zx-list-l1">行情</div>
<div class="sj-zx-list-l2 sj-zx-list-l2-head">品类</div>
<div class="sj-zx-list-l2 sj-zx-list-l2-head">回购</div>
<div class="sj-zx-list-l2 sj-zx-list-l2-head">销售</div>
<div class="sj-zx-list-l2 sj-zx-list-l2-head">高/低</div>