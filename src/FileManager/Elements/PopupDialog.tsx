import React, { useState, forwardRef, Ref } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Zoom from '@material-ui/core/Zoom'
import { ZoomProps } from '@material-ui/core/Zoom'
import InputField from './InputField'
import useStyles from './Styles'
import { Popup } from '../types'

// 打开从小到大的动画效果
const Transition: any = forwardRef(function Transition(
  props: ZoomProps,
  ref: Ref<unknown>
) {
  return <Zoom in={true} ref={ref} {...props} />
})

// export interface Props {
//   title: string
//   description: string
//   handleClose: () => void
//   handleSubmit: () => void
//   nameInputSets: {
//     label: string
//     value: string
//     callBack: (value: string) => void
//   }
// }

const AlertDialogSlide: React.FC<Popup> = ({
  title,
  description,
  handleClose,
  handleSubmit,
  nameInputSets
}) => {
  const classes = useStyles()
  const nameValue =
    typeof nameInputSets.value !== undefined ? nameInputSets.value : ''
  const [renameText, setRenameText] = useState(nameValue)
  const handleNameChange = (value: string) => {
    setRenameText(value)
    nameInputSets.callBack && nameInputSets.callBack(value)
  }
  return (
    handleClose && (
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        className="dialogBlock"
      >
        <DialogTitle className="dialogTitle">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText className="dialogDescription">
            <div
              className={classes.dialogDescription}
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </DialogContentText>
          {nameInputSets.value && (
            <div className="form-group">
              <InputField
                type="text"
                label={nameInputSets.label}
                change={handleNameChange}
                value={renameText}
                variant="outlined"
              />
            </div>
          )}
        </DialogContent>

        <DialogActions className="dialogButtons">
          {handleClose && (
            <Button onClick={handleClose} variant="contained" color="secondary">
              Cancel
            </Button>
          )}
          {handleSubmit && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  )
}

export default AlertDialogSlide
