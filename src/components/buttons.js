import React from "react";
import CustomButton from "./CustomButton";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

export const CreateNewButton = ({onClick, loading, ...props}) => {
    return (
        <CustomButton variant="contained"
                      color="primary"
                      onClick={() => onClick()}
                      startIcon={<AddBoxOutlinedIcon/>}
                      loading={loading}
                      {...props}
        >
            Create New
        </CustomButton>
    )
}

export const AddNewButton = ({onClick, loading, ...props}) => {
    return (
        <CustomButton variant="contained"
                      color="primary"
                      onClick={() => onClick()}
                      startIcon={<AddBoxOutlinedIcon/>}
                      loading={loading}
                      {...props}
        >
            Add New
        </CustomButton>
    )
}