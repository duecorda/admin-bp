import { ReactElement } from 'react';

interface Props {
    source: string;
    label?: string;
    gamesData: any;
}

const TextCard = ({ source, label, gamesData }: Props): ReactElement => {
    console.log('gamesData', gamesData);
    const value = gamesData?.[source];
    console.log('value', value);

    return (
        <div className="text-field-card">
          <div className="text-field-card-content">
            <label>{label}</label>
            <span>{ value }</span>
          </div>
        </div>
    );
};

export default TextCard;