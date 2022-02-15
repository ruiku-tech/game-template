export default class MenuController{
  constructor(container,selectClass){
    this.container=container;
    this.selectClass=selectClass;
    this.selected=-1;
    this.trigger=null;
    this.container.onclick=this._onTapMenu.bind(this)
  }
  _onTapMenu(e){
    let children=this.container.children;
    for(let i=0,len=children.length;i<len;++i){
      if(e.target === children[i]){
        this.select(i);
        return;
      }
    }
  }
  onSelect(trigger){
    this.trigger=trigger;
  }
  select(value){
    if(value===this.selected) return;
    let element = null;
    if(this.selected!=-1){
      element = this.container.children[this.selected];
      if(element) element.classList.remove(this.selectClass);
    }
    this.selected = value;
    element = this.container.children[this.selected];
    if(element) element.classList.add(this.selectClass);
    if(this.trigger){
      this.trigger(value);
    }
  }
}