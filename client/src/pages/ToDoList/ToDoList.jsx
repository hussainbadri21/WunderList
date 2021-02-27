import React, {Component} from 'react';
import Navbar from "../../components/header/Navbar";
import {Button, message, Checkbox, Icon, Popconfirm} from 'antd';
import 'antd/dist/antd.css'
import * as Constants from "../../constants/constants";
import axios from "axios";
import {connect} from 'react-redux';
import ContentEditable from "react-contenteditable";
import delete_icon from '../../assets/delete.svg';
import {G_URL, G_COOKIE_NAME} from "../../constants/constants";
import {check_login} from "../../utils/cookie.util";
import {__getCookie} from '../../utils/cookie.util'
import EmptyState from "../../components/EmptyState/EmptyState";


class ToDoList extends Component {
    componentDidMount() {
        if (check_login()) {
            this.getToDoList();
        } else {
            window.location.href = G_URL;
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.taskContent === undefined || nextProps.taskContent === this.props.taskContent
    }

    getToDoList = () => {
        axios.get(Constants.G_API_URL + 'task/', {
            headers: {
                "Authorization": __getCookie(G_COOKIE_NAME).cookieValue
            }
        })
            .then((res) => {
                res = res.data;
                if (res.status === 1) {
                    this.props.setTasks({...res.tasks});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    renderList = (tasks, status) => {
        return tasks.map((task) => {
            return (<div className='task-card f-d  f-v-c' key={task.task_id}
                         onClick={() => this.props.setActiveTask(task.task_id)}>
                <Checkbox checked={task.status === 2}
                          onChange={(e) => this.updateTask('', e.target.checked, '', task.task_id)}
                          className='todo-checkbox'/>
                <ContentEditable
                    className={`content-editor body-regular ${status && status === 'completed' ? 'completed-task' : ''}`}
                    html={task.content ? task.content : 'Click to add a task'} // innerHTML of the editable div
                    disabled={task.status === 2} // use true to disable edition
                    onBlur={this.updateTask}
                    // onChange={handleRenameChange}
                    onChange={this.props.addTaskContent}
                />
                <div className='sidebar-icons f-d'>
                    {task.starred ? <Icon type="star" onClick={() => this.updateTask('', '', false, task.task_id)}
                                          theme="filled"/> :
                        <Icon onClick={() => this.updateTask('', '', true, task.task_id)} type="star"/>}
                    <Popconfirm placement="right" title='Are you sure to delete this task?' onConfirm={this.deleteTask}
                                okText="Yes"
                                cancelText="No">
                        <div className="sidebar-icon bg-image-full"
                             style={{backgroundImage: `url(${delete_icon})`}}
                        ></div>
                    </Popconfirm>
                </div>
            </div>)
        })
    }

    renderToDoList = () => {
        console.log('rerender')
        const incomplete_tasks = this.renderList(Object.values(this.props.tasks).filter(task => task.status === 1))
        const complete_tasks = this.renderList(Object.values(this.props.tasks).filter(task => task.status === 2), 'completed')
        return incomplete_tasks.concat(complete_tasks)
    }

    deleteTask = () => {
        axios.delete(Constants.G_API_URL + 'task/', {
            params: {
                task_id: this.props.activeTask
            },
            headers: {
                "Authorization": __getCookie(G_COOKIE_NAME).cookieValue
            }
        })
            .then((res) => {
                res = res.data;
                if (res.status === 1) {
                    message.success(res.message);
                    this.props.deleteTask(this.props.activeTask);

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    addTask = () => {
        axios.post(Constants.G_API_URL + 'task/', {}, {
            headers: {
                "Authorization": __getCookie(G_COOKIE_NAME).cookieValue
            }
        })
            .then((res) => {
                res = res.data;
                if (res.status === 1) {
                    message.success(res.message);
                    this.props.addTask({...res.task});
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateTask = (e, checked, starred, task_id) => {
        let data = {
            task_id: task_id ? task_id : this.props.activeTask
        }
        if (this.props.taskContent !== '' && this.props.taskContent.length > 0) {
            data.content = this.props.taskContent
        }
        let update_type = 'content'
        if (checked !== null && checked !== undefined && checked !== '') {
            data.completed = checked
            checked = checked ? 2 : 1
            update_type = 'check'
        }
        if (starred !== null && starred !== undefined && starred !== '') {
            data.starred = starred
            update_type = 'star'
        }
        axios.put(Constants.G_API_URL + 'task/', data, {
            headers: {
                "Authorization": __getCookie(G_COOKIE_NAME).cookieValue
            }
        })
            .then((res) => {
                res = res.data;
                if (res.status === 1) {
                    this.props.updateTask({
                        update_type: update_type,
                        value: update_type === 'content' ? this.props.taskContent : update_type === 'check' ? checked : starred,
                        task_id: this.props.activeTask,

                    })
                    this.props.addTaskContent('')

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (
            <>
                <Navbar/>
                {!this.props.tasks || Object.keys(this.props.tasks).length === 0 ?
                    <EmptyState/> :
                    <div className="body-container">
                        <div className='task-container '>
                            {this.renderToDoList()}
                        </div>
                    </div>}
                <Button onClick={this.addTask} className='fab'>
                    <Icon style={{fontSize: '18px', color: 'white'}} type="plus"/>
                </Button>
                <style jsx={"true"}>
                    {`
                      body {
                        background: var(--smoke);

                      }


                      .body-container {
                        padding-left: 5rem;
                        padding-right: 5rem;
                        margin-top: 6rem;
                      }

                      .body-container .task-container {
                        margin-left: 20rem;
                        margin-right: 20rem;
                        background: var(--dove);
                        box-shadow: var(--peaky-shadow);
                      }

                      .body-container .task-container .task-card {
                        padding: 1rem 2rem;
                        border-bottom: 1px solid var(--snowfall);
                      }

                      .body-container .task-container .task-card .content-editor {
                        overflow-wrap: anywhere;
                      }

                      .body-container .task-container .task-card .sidebar-icons {
                        margin-left: auto;
                        margin-right: 0;
                        padding-left: 1rem;
                        cursor: pointer;
                      }

                      .body-container .task-container .task-card .sidebar-icons .sidebar-icon {
                        height: 14px;
                        width: 14px;
                        margin-left: 0.5rem;
                      }

                      .body-container .task-container .task-card .todo-checkbox {
                        padding-right: 1rem;
                      }

                      .body-container .task-container .task-card .completed-task {
                        text-decoration: line-through;
                        color: var(--sandstone)
                      }

                      .fab {
                        position: fixed;
                        right: 20px;
                        border-radius: 100%;
                        bottom: 20px;
                        width: 60px;
                        height: 60px;
                        border: none;
                        box-shadow: var(--peaky-shadow-high-2);
                        background: var(--bluelagoon);
                      }

                      .fab:active, .fab:focus {
                        background: var(--bluelagoon);
                      }

                      .fab:hover {
                        background: var(--bluemoon);
                      }


                    `}
                </style>
            </>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        tasks: state.tasks,
        activeTask: state.activeTask,
        taskContent: state.taskContent,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTasks: (value) => {
            dispatch({type: 'SET_TASKS', payload: value})
        },
        addTask: (value) => {
            dispatch({type: 'ADD_TASK', payload: value})
        },
        deleteTask: (value) => {
            dispatch({type: 'DELETE_TASK', payload: value})
        },
        updateTask: (value) => {
            dispatch({type: 'UPDATE_TASK', payload: value})
        },
        setActiveTask: (value) => {
            dispatch({type: 'SET_ACTIVE_TASK', payload: value})
        },
        addTaskContent: (e) => {
            dispatch({type: 'ADD_TASK_CONTENT', payload: e.target ? e.target.value : ''})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);
