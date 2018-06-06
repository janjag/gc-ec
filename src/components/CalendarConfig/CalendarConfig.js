import React from 'react';

import './CalendarConfig.css';
import { Edit } from '../UI/Icons/Icons';

const CalendarConfig = ( props ) => {
    let t = 'Calculating events length...';
    if (props.total > 0) {
        t = `${props.total} min / ${props.total /60} h`
    }
    let settings = '';
    if (props.editable) {
        settings = (
            <form className="Config_form">
                <fieldset className="Config_field">
                    <label htmlFor="hRate">Hourly rate</label>
                    <input type="number" name="hRate" value={props.hRate} onChange={props.update}/>
                </fieldset>
                <fieldset className="Config_field">
                    <label htmlFor="tax">Tax</label>
                    <input type="number" name="tax" value={props.tax} onChange={props.update}/>
                </fieldset>
            </form>
        );
    }
    let computed = (
        <div className="Calendar_config_computed">
            <p><b>{(props.total / 60) * props.hRate} PLN</b> <i>brutto</i> / 
            Tax: {((props.total / 60) * props.hRate) * props.tax} PLN </p>
            <p><b>{((props.total / 60) * props.hRate) - (((props.total / 60) * props.hRate) * props.tax)} PLN</b> <i>netto</i></p>
        </div>
    );
    return (
        <div className="Calendar_config">
            <div className="Calendr_config_header">
                <p><i>Total:</i> {t}</p>
                <button className="Edit_button Basic_button" onClick={props.edit}><Edit /></button>
            </div>
            {computed}
            {settings}
        </div>
    );
}

export default CalendarConfig;