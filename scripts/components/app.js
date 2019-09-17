import React, { Component, PureComponent } from 'react';

//Redux
import {connect} from "react-redux";
import { store } from "../store/store";
import { addCity } from "../actionCreators/actionCreator";

import '../../styles/app.scss';

class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.cityText  = React.createRef();
        this.searchBtn = React.createRef();
        this.cityHelp  = React.createRef();
        this.alert     = React.createRef();
        this.weather   = React.createRef();
        this.main      = React.createRef();
        this.wind      = React.createRef();
        this.region    = React.createRef();
        this.blind     = React.createRef();
    }

    writeWeather(data) {

        const writeInfo = (data, root) => {
            root.current.innerHTML = "";
            for(let i in data) {
                const element = document.createElement('span');
                element.className='element';
                element.innerHTML = '<b>' + i.toUpperCase() + '</b>' + ' : ' + data[i];
                root.current.append(element);
            }
        };

        const showInfo = () => {
            writeInfo(data.weather[0], this.weather);
            writeInfo(data.main, this.main);
            writeInfo(data.wind, this.wind);
            this.region.current.innerHTML = '<span class="city-region"><b>Region:</b> ' + data.name + '</span>';
        }

        const showAlert = () => {
            this.alert.current.classList.remove('hidden');
            this.cityHelp.current.classList.remove('opened');
            this.alert.current.innerHTML = 'Данные по городу не удалось получить. Введите другой город.'
        };

        data.cod == 200 ? showInfo() : showAlert();
    }

    completeField(e){
        this.cityText.current.value = e.target.innerHTML;
        this.cityHelp.current.classList.remove('opened');
    }

    clearArray(arr){
        let result = [];

        for (let str of arr) {
            if (!result.includes(str)) {
              result.push(str);
            }
          }
        return result;
    }

    searchCityWeather() {

        if (this.cityText.current.value == '') return;

        store.dispatch(addCity(this.cityText.current.value));
        if(!localStorage.getItem("cities")) localStorage.setItem("cities", JSON.stringify([]));

        localStorage.setItem("cities", JSON.stringify(this.clearArray(store.getState().MainPageReducer.city)));
        this.newCity();
        this.cityHelp.current.classList.remove('opened');

        let data = {
            q : this.cityText.current.value,
            appid : "3b8f1c62c7a6c202168aeb202ff2f081"
        };

        let request = fetch('https://api.openweathermap.org/data/2.5/weather?q=' + data.q + '&APPID=' + data.appid);
        request.then(res => res.json()).then(data => this.writeWeather(data));
    }

    newCity(e){
        const cities = JSON.parse(localStorage.getItem("cities"));
        this.cityHelp.current.innerHTML = "";
        this.alert.current.classList.add('hidden');

        for (const i in cities) {
            const cityItem = document.createElement('li');
            cityItem.className = "city";
            cityItem.innerHTML = cities[i];

            this.cityHelp.current.appendChild(cityItem);
        }

        this.cityHelp.current.classList.add('opened');
    }

    turnOnBlind() {
        if (this.blind.current.innerHTML == 'On') {
            this.blind.current.innerHTML = 'Off';
            document.querySelector('body').classList.add('blind');
        } else {
            this.blind.current.innerHTML = 'On';
            document.querySelector('body').classList.remove('blind');
        }
    }

    render() {
        return (
            <div className='app-container'>
                <p className='title'>Weather in your city. Weather, main, wind.</p>
                <div className='buttons-blind'>
                    <p>Version for visually impaired:</p>
                    <button ref={this.blind} onClick={this.turnOnBlind.bind(this)}>On</button>
                </div>
                <div className='wrapper'>
                    <input onClick={this.newCity.bind(this)} ref={this.cityText} type='text' placeholder='Введите город' className='search-field' />
                    <button onClick={this.searchCityWeather.bind(this)} ref={this.searchBtn}>Поиск</button>
                </div>
                <div className="alert hidden" ref={this.alert}></div>
                <ul onClick={this.completeField.bind(this)} ref={this.cityHelp} className='previousCities'></ul>
                <div className="Info">
                    <p className="Region" ref={this.region}></p>
                    <div className="region-info">
                        <div ref={this.weather} className="Weather"></div>
                        <div ref={this.main} className="Main"></div>
                        <div ref={this.wind} className="Wind"></div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        state : state.MainPageReducer
    }
};

export default connect(mapStateToProps)(WeatherApp);