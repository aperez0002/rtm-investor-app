import React from "react";

export default class Snaps extends React.PureComponent {
    constructor(props) {
        super(props);
        this._ref = React.createRef();
    }
 componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js'
        script.async = true;
        script.innerHTML = JSON.stringify({
            "feedMode": "all_symbols",
            "colorTheme": "light",
            "isTransparent": false,
            "displayMode": "regular",
            "width": "100%",
            "height": "100%",
            "locale": "en"
        })
        this._ref.current.appendChild(script);
    }
    render() {
        return(
        <div class="tradingview-widget-container" ref={this._ref}>
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright"></div>
        </div>
        );
    }
   
}