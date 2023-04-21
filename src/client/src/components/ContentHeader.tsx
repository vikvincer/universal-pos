import React from "react";
import "./ContentHeader.scss";
import { Link } from 'react-router-dom';


export interface ContentHeaderModel {
    title: string;
    link?: string;
    event?: () => void;
}

interface ContentHeaderProps {
  contentHeaderProps: Array<ContentHeaderModel>;
}

const ContentHeader: React.FC<ContentHeaderProps> = ({ contentHeaderProps }) => {
    const contentHeaderElements = contentHeaderProps.map((item, index) => {
        return (
            <>
                <React.Fragment key={index}>
                    <Link className="content-header__history-link" to={`${item.link}`} onClick={item.event}>{item.title}</Link>
                </React.Fragment>
            </>
        );
    });

    return (
        <div className="content-header">
            <h3 className="content-header__title">
                {contentHeaderElements}
            </h3>
        </div>
    );
};

export default ContentHeader;
