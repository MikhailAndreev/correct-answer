import React, { Component } from 'react';
import styles from "./NewQuestionContainer.module.css";



const ButtonGrid = (props) => {
    return    <button
        // value={props.correct}
        onClick={props.handleClick}
        id={props.id}
        // className={`${props.checked && props.correct===true ? styles.activeBtn : styles.btn} ${props.checked && props.correct === false ? styles.redBtn : ''}`}
        className={`${props.checked  ? styles.activeBtn : styles.btn} ${props.error && props.correct === false && props.checked  ? styles.redBtn : ''}`}
    >

        {props.option}
    </button>
};


class NewQuestionContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [
                {checked:false, id: 7, option:'5 + x = 11', correct: true,  },
                {checked:false, id: 8, option:'16 - x = 12', correct:false,  },
                {checked:false, id: 9, option:'x + 5 = 11', correct:true,  },
                {checked:false, id: 10, option:'x - 16 = 12', correct:false, },
            ],
            errorList:0,
            correctList: 0,
            isAccept:false,
            error: false,
            showQuestion: true,
            isChecked: 0,
            isFullAns: false,
            reset: false,
            notFullAns: false,
            showResult:false

        };
        this.baseState = this.state
        this.handleClick = this.handleClick.bind(this);
        this.findCorrect = this.findCorrect.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }


    componentDidUpdate(prevState) {
        if(this.state.reset){
            if(this.state.correctList === 2 &&  this.state.errorList < 1){
                setTimeout(() => {
                    this.resetForm(false, true)
                }, 1000);
                console.log('you are here')
            }
            if(this.state.correctList === 1 && this.state.errorList > 0 ){
                setTimeout(() => {
                    this.resetForm(true, false)
                }, 1000);
            }

            if(this.state.correctList === 1 && !this.state.errorList){
                setTimeout(() => {
                    this.resetForm(true, false)
                }, 1000);
            }

            if(this.state.errorList > 0 && !this.state.correctList){
                setTimeout(() => {
                    this.resetForm(false, false)
                }, 1000);
            }
        }
    }

    showResult = () => {
        this.setState({
            showResult: true,
        });
    };

    findCorrect =(condition)=> {
        const result = this.state.data.find(e => e.id === +condition);
        if(result) {
            console.log(result)
        }
        else{
            console.log('cant find')
        }
        return result
    };

    resetForm = (ans, accept) => {
        this.setState(prevState =>({
            ...this.baseState,
            notFullAns: ans,
            isAccept: accept
        }));
        console.log(this.state.notFullAns)
    };

    // handleClick = (e) => {
    //     // e.stopPropagation();
    //     const id = e.target.id;
    //     const result = this.findCorrect(id) ;
    //
    //     this.setState(prevState => {
    //         return  {
    //             showQuestion:false,
    //             data: prevState.data.map(
    //                 item => (item.id === +id ?
    //                     { ...item,
    //                         checked: !item.value
    //                     } : item)
    //             )
    //         }
    //     });
    //
    //     if(result['correct'] === true && parseInt(id, 10) === result['id']){
    //         this.setState({
    //             correctList: this.state.correctList + 1,
    //         });
    //         console.log('ADD TO ARRAY')
    //     }
    //     if(result['correct'] === false){
    //         this.setState({
    //             errorList: this.state.errorList + 1,
    //             error:true
    //         });
    //         console.log('ADD TO ARRAY')
    //     }
    //
    //     console.log(typeof result['id'])
    //     console.log(this.state.correctList)
    //
    // };

    handleClick = (e) => {
        const id = e.target.id;
        const result = this.findCorrect(id) ;

        // if(result['correct'] === true && parseInt(id, 10) === result['id']){
        //     this.setState({
        //         correctList: this.state.correctList + 1,
        //     });
        // }
        // if(result['correct'] === false){
        //     this.setState({
        //         errorList: this.state.errorList + 1,
        //
        //     });
        // }

        if(!result['checked']){
            if(result['correct'] === true && parseInt(id, 10) === result['id']){
                this.setState(prevState => {
                    return  {
                        correctList: this.state.correctList + 1,
                        isChecked:prevState.isChecked + 1,
                        data: prevState.data.map(
                            item => (item.id === +id ?
                                { ...item,
                                    checked: true
                                } : item)
                        )
                    }
                });
            }

            if(result['correct'] === false && parseInt(id, 10) === result['id']){
                this.setState(prevState => {
                    return  {
                        errorList: this.state.errorList + 1,
                        isChecked:prevState.isChecked + 1,
                        data: prevState.data.map(
                            item => (item.id === +id ?
                                { ...item,
                                    checked: true
                                } : item)
                        )
                    }
                });
            }


        }

        if(result['checked']) {
            if(result['correct'] === true && parseInt(id, 10) === result['id']){
                this.setState(prevState => {
                    return  {
                        correctList: this.state.correctList - 1,
                        isChecked:prevState.isChecked - 1,
                        data: prevState.data.map(
                            item => (item.id === +id ?
                                { ...item,
                                    checked: false
                                } : item)
                        )
                    }
                });
            }
            if(result['correct'] === false && parseInt(id, 10) === result['id']){
                this.setState(prevState => {
                    return  {
                        errorList: this.state.errorList - 1,
                        isChecked:prevState.isChecked - 1,
                        data: prevState.data.map(
                            item => (item.id === +id ?
                                { ...item,
                                    checked: false
                                } : item)
                        )
                    }
                });
            }

        }

        // if(!result['checked']){
        //     this.setState(prevState => {
        //         return  {
        //             isChecked:prevState.isChecked + 1,
        //             data: prevState.data.map(
        //                 item => (item.id === +id ?
        //                     { ...item,
        //                         checked: true
        //                     } : item)
        //             )
        //         }
        //     });
        // }
        // else {
        //     this.setState(prevState => {
        //         return  {
        //             isChecked:prevState.isChecked - 1,
        //             data: prevState.data.map(
        //                 item => (item.id === +id ?
        //                     { ...item,
        //                         checked: false
        //                     } : item)
        //             )
        //         }
        //     });
        // }

        console.log(this.state.errorList)
    };

    handleAccept = (e) => {
        const id = e.target.id;
        const result = this.findCorrect(id) ;

        if(this.state.correctList > 1){
            this.setState(prevState => {
                return  {

                    reset:true
                }
            });
            console.log('reset TRUE')
        }

        if(this.state.correctList === 1){
            this.setState(prevState => {
                return  {
                    showQuestion:false,
                    error:true,
                    reset:true
                }
            });
            console.log('reset TRUE')
        }
        if(this.state.errorList > 0){
            this.setState(prevState => {
                return  {
                    showQuestion:false,
                    error:true,
                    reset:true
                }
            });
        }
        console.log(this.state.isAccept)

    };


    render() {
        const {data, error} = this.state;

        const renderButtons = data.map((item)=> {
            const {id, option, correct, checked, } = item;
            return (
                <ButtonGrid
                    handleClick={this.handleClick}
                    id={id}
                    option={option}
                    correct={correct}
                    checked={checked}
                    error={error}
                />
            )
        });
        return (
            <div>

                <div className={styles.wrapper}>

                        <div className={styles.mainGrid}>

                            <h1>
                                Выберте все уравнения, в которых решением является число 6
                            </h1>

                            {this.state.isAccept ?

                                ''
                                :
                                <div className={styles.btnGrid}>
                                    {renderButtons}
                                </div>
                            }



                                    <div className={styles.tips}>

                                        {this.state.isAccept ?

                                            <p>Correct answer</p>
                                            :
                                            ''
                                        }

                                        {!this.state.isAccept && !this.state.notFullAns && !this.state.error && this.state.isChecked === 0 ?

                                            <p>Вычисли X</p>

                                            :

                                            ''
                                        }

                                        {this.state.notFullAns && this.state.isChecked === 0 ?

                                            <p>Это не все правильные ответы</p>

                                            :

                                            ''
                                        }

                                    </div>

                                    <div className={styles.grid}>
                                        <button
                                            onClick={this.handleAccept}
                                            // className={`${this.state.isAccept  ? styles.acceptBtnActive : styles.acceptBtn} ${this.state.error || this.state.correctList ===1 ? styles.redAccept : ''}`}
                                            className={`${this.state.isChecked > 0 ? styles.acceptBtnActive : styles.acceptBtn} 
                                    ${this.state.error  ? styles.redAccept : ''} ${this.state.isAccept  ? styles.acceptBtnCorrect : ''}`}

                                        >
                                            Готово
                                        </button>
                                    </div>

                        </div>



                </div>
            </div>
        );
    }
}

export default NewQuestionContainer;