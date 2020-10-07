import React from "react";
import {getFormattedTimestamp} from "../../../../components/Table/headCells/timeHeadCell";
import Grid from "@material-ui/core/Grid";

export const ConversationMessageText = ({data, isMine, startsSequence, endsSequence, showTimestamp}) => {

    const friendlyTimestamp = getFormattedTimestamp(data.timestamp);

    return (
        <>
            <Grid item xs={12}>
                <div className={[
                    'message',
                    `${isMine ? 'mine' : ''}`,
                    `${startsSequence ? 'start' : ''}`,
                    `${endsSequence ? 'end' : ''}`
                ].join(' ')}>
                    {
                        showTimestamp &&
                        <div className="timestamp">
                            {friendlyTimestamp}
                        </div>
                    }

                    <div className="bubble-container">
                        <div className="bubble" title={friendlyTimestamp}>
                            {data.text}
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    );
}
