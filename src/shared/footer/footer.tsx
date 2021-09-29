import * as React from 'react';
import './footer.scss';

export default class FooterComponent extends React.Component {
    public render() {
        return (
            <div className="footer">
                <div className="quote">Made with <span className="red">❤</span> by Lemontech</div>
            </div>
        )
    }
}