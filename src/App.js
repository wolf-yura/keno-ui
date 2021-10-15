import React from 'react';

import logo from './assets/img/keno_top_logo.png';
import lose from './assets/img/orange-lose-final.gif';
import win from './assets/img/orange-win-final.gif';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [arrList, setArrList] = React.useState(new Array(50).fill(0));
  const [bottomList, setBottomList] = React.useState(new Array(2).fill(0));
  const [checkList, setCheckList] = React.useState([]);
  const [ratingList, setRatingList] = React.useState([]);

  const [isTap, setTap] = React.useState(true);
  const [amount, setAmount] = React.useState(0);
  const [earn, setEarn] = React.useState(0.5);
  const [result, setResult] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [animation, setAnimation] = React.useState(false);

  const all = 50;

  const textBottomInfo = [
    [0, 3.26],
    [0, 3.26],
    [0, 0, 11.41],
    [0, 0, 2, 26],
    [0, 0, 0, 8, 72],
    [0, 0, 0, 2, 16, 225.9],
    [0, 0, 0, 2, 2, 45, 650],
    [1, 0, 0, 0, 2, 11, 150, 4250],
    [1, 0, 0, 0, 1, 5, 35, 400, 21400],
    [1, 0, 0, 0, 0, 3, 16, 180, 2000, 50000],
    [1, 0, 0, 0, 0, 3, 7, 20, 500, 10000, 200000]];

  const info = "The readonly attribute is a boolean attribute When present, it specifies that a text area should be read-only In a read-only text area,\nthe content cannot be changed, but a user can tab to it, highlight it and copy content from it.";

  React.useEffect(() => {
    initArray();
  }, []);

  const initArray = () => {
    var i = 0;
    var tempList = [];
    for (; ;) {
      if (i > all - 1) break;
      tempList.push({ status: false, id: i + 1 });
      i++;
    }
    setArrList(tempList);
    setCheckList([]);
  }

  const onItem = (p) => {
    const newList = [];
    const tempList = [];

    arrList.forEach((i, index) => {
      newList.push(i.id === p.id ? { id: i.id, status: !i.status } : i)

      if (i.id === p.id) {
        if (!i.status) {
          tempList.push(index + 1);
        }
      } else {
        if (i.status) {
          tempList.push(index + 1);
        }
      }
    })

    if (p.status) {
      setCheckList(list => list.filter(item => item.id !== p.id))
    } else {
      if (tempList.length > 10) {
        setCheckList(list => [...list.slice(1), p])
      } else {
        setCheckList(list => [...list, p])
      }
    }

    setBottomList(new Array(tempList.length === 0 ? 2 : tempList.length === 11 ? 11 : tempList.length + 1).fill(0));

    setArrList(tempList.length > 10 ? newList.map(item => item.id === checkList[0].id ? { id: item.id, status: false } : item) : newList);
  }

  const onPlay = (item) => {
    if (item.status) return;
    setArrList(item.list);
    setRatingList(list => list.map(i => {
      const temp = i;
      if (i.id === item.id) {
        temp.status = true;
        return temp;
      } else {
        return i;
      }
    }))

    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 3500);
  }

  const onBet = () => {
    if (checkList.length === 0) return;

    setAmount(item => item += 0.5);
    setRatingList(item => [{ id: item.length + 1, status: false, value: checkList.length + "/10, " + earn + ", 1/" + checkList.length, result: "???", list: arrList }].concat(item));
    initArray();
  }

  return (
    <div className="App">
      <div className="app-body">
        <div className="row">
          <div className="col-md-3">
            <div>
              <div className="top-button">
                <button
                  className={isTap ? "select" : ""}
                  onClick={() => setTap(true)}>BET</button>
                <img src={logo} alt="logo" />
                <button
                  className={isTap ? "" : "select"}
                  onClick={() => setTap(false)}>INFO</button>
              </div>
              {isTap ? <div className="left-panel-part">
                <div className="right-input">
                  <span>Amount spent beting</span>
                  <p>
                    {amount}
                  </p>
                </div>
                <div className="right-input">
                  <span>Playtrough balance</span>
                  <p>{earn}</p>
                </div>
                <div className="history-list">
                  <span>Log</span>
                  <div>
                    {ratingList.map((item, index) => {
                      return <div className="item" key={index}>
                        <span className={item.status ? "pending" : "play"}>{item.value}</span>
                        <button onClick={() => { onPlay(item) }} className={item.status ? "play-end" : "play-loading"}>{item.status ? "+3.26" : "PLAY"}</button>
                      </div>
                    })}
                  </div>
                </div>
                <div className="center-input">
                  <span>Your BET amount:</span>
                  <p>0.5</p>
                </div>
                <button className={checkList.length === 0 ? "disable" : ""} onClick={() => { onBet() }}>BET</button>
              </div> : <div className="left-panel-info">
                <textarea readOnly value={info} />
              </div>}
            </div>
          </div>
          <div className="col-md-9">
            <div className="body-panel">
              <div></div>
              <div className="d-flex mt-3">
                <div className="number">
                  {arrList.map((item, index) =>
                    animation && item.status && result.includes(item.id) ?
                      <img src={win} alt="win" key={index} /> : animation && item.status ?
                        <img src={lose} alt="lose" key={index} /> :
                        <p
                          key={index}
                          className={`${item.status ? 'select' : ''}`}
                          onClick={() => onItem(item)}>{index + 1}</p>)}
                </div>
              </div>
              <div className="A">
                {bottomList.map((item, index) => <span key={index}>{(bottomList.length === 2 ? textBottomInfo[0][index] : textBottomInfo[bottomList.length - 1][index]) + "x"}</span>)}
              </div>
              <div className="B">
                {bottomList.map((item, index) => <span key={index}>{index + "x"}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
