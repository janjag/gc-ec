import React from 'react';

import './CalendarConfig.css';

import Aux from '../../hoc/Aux';
import Toggle from '../UI/Toggle/Toggle';
import { Edit } from '../UI/Icons/Icons';

const CalendarConfig = ( props ) => {
    let t = 'No events found...';
    let computed = null;
    let settings = '';
    if (props.editable) {
        settings = (
            <Aux>
                <form className="Config_form">
                    <fieldset className="Config_field">
                        <label htmlFor="hRate">Hourly rate</label>
                        <input type="number" name="hRate" value={props.hRate} onChange={props.update}/>
                    </fieldset>
                    <fieldset className="Config_field">
                        <label htmlFor="tax">Tax (%)</label>
                        <input type="number" name="tax" max="100" min="0" value={props.tax} onChange={props.update}/>
                    </fieldset>
                    <fieldset className="Config_field">
                        <label htmlFor="localCurrency">Currency</label>
                        <input type="text" name="localCurrency" value={props.currency} onChange={props.update}/>
                    </fieldset>
                </form>
            </Aux>
        );
    }

    if (props.total > 0) {
        t = `${props.total} min / ${props.total /60} h`;
    }
    if (props.hRate > 0) {
        computed = (
            <div className="Calendar_config_computed">
                <p><b>{((props.total / 60) * props.hRate).toFixed(2)} {props.currency}</b> <i>brutto</i> / 
                Tax: {(((props.total / 60) * props.hRate) * (props.tax / 100)).toFixed(2)} {props.currency} </p>
                <p><b>{(((props.total / 60) * props.hRate) - (((props.total / 60) * props.hRate) * (props.tax / 100))).toFixed(2)} {props.currency}</b> <i>netto</i></p>
            </div>
        );
    }
    return (
        <div className="Calendar_config">
            <Toggle 
                visible={props.visible}
                hidden={props.hidden}
            > claendar </Toggle>
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