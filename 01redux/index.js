// ///////////         TODAY LEARNING REDUX     VIA TODO APP
// //////////            1. REDUX  (BASIC )        <01redux>
/////////////            2.REACT_REDUX     <02react-redux>
////////////             3.@REDUX-TOOLKIT(createSlice , createAsyncThunk) <03@reduxjs_toolkit>
////////////             3.@REDUX-TOOLKIT(createApi, fetchBaseQuery)      <04@reduxjs_toolkit>


//                  LET`s BEGIN >>>>>>>>>>>




import { createStore, applyMiddleware, combineReducers } from 'redux';
        //1.createStore-> configuration of store 
        //2.applyMiddleware-> applying middelware like thunk,logger, etc 
        //3.combineReducer-> combine multiple reducer 

// middelware 
import logger from 'redux-logger';//logger for redux
import {thunk} from 'redux-thunk';// api level action creator middelware configuration 
// api fetching package 
import axios from 'axios';


// REDUX         EXample by createStore 
// STEP>>>>>
       //1.create action type/name contant
       const inc = 'account/increment';
       const dec = 'account/decrement';
       const incByAmt = 'account/incrementByAmount';
       const getAccUserPending = 'account/getUser/pending';
       const getAccUserFulFilled = 'account/getUser/fulfilled';
       const getAccUserRejected = 'account/getUser/rejected';

       const incBonus = 'bonus/increment';

       //2.create Reducer & action creater
      //===============================REDUCER================================================================     
                            //  {Reducer is a function that manipulate the state by  the basis of action type }
                            //parameter of the reducer are (state , action)
                            //it invoked when we use store.dispatch({type:actionType,payload:data})
                            //we can also create creator creator that return the dispatch object 
                              // ex:-const increment=()=> {return { type: inc }};
                              //and then store.dispatch(increment())
                              function accountReducer(state = { amount: 1 }, action) {

                                switch (action.type) {
                                  case getAccUserFulFilled:return { amount: action.payload, pending:false };
                              
                                  case getAccUserRejected:return {...state, error:action.error, pending:false  };
                                  
                                  case getAccUserPending:return { ...state,pending:true };
                                  
                                  case inc:return { amount: state.amount + 1 };
                                  
                                  case dec:return { amount: state.amount - 1 };
                                  
                                  case incByAmt:return { amount: state.amount + action.payload };
                                  
                                  default:return state;
                                }
                              }
                              
                              function bonusReducer(state = { points: 0 }, action) {
                                  switch (action.type) {
                                      case incBonus:return { points:  state.points + 1 };
                                      
                                      case incByAmt:
                                          if(action.payload>=100)
                                            return { points:  state.points + 1 };
                                      
                                      default: return state;    
                                  }
                              }
      //===============================ACTION CREATOR=========================================================                        
                              function getUserAccount(id) {
                                return async (dispatch, getState) => {//it can access dispatch , getstate
                                  try{
                                      dispatch(getAccountUserPending());
                                      const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
                                      dispatch(getAccountUserFulFilled(data.amount));
                                  } catch(error){
                                      dispatch(getAccountUserRejected(error.message));
                                  }
                                 
                                };
                              }
                              const getAccountUserFulFilled=(value)=>{ return { type: getAccUserFulFilled, payload: value }};
                              const getAccountUserRejected=(error)=> {return { type: getAccUserRejected, error: error }};
                              const getAccountUserPending=()=> {return { type: getAccUserPending }}
                              
                              
                              const increment=()=> {return { type: inc }};
                              const decrement=()=> {return { type: dec }};
                              const incrementByAmount=(value)=> {return { type: incByAmt, payload: value }};
                              const incrementBonus=(value)=> {return { type: incBonus}}
                              
      
      // 3.Configure the store {Required===> Reducers,middelware }
                              //it done things 
                              const store = createStore(
                                combineReducers({
                                  account: accountReducer,
                                  bonus: bonusReducer
                                }),
                                applyMiddleware(logger.default, thunk) //thunk for asynchronus 
                              );  
      // 4.use dispatch to invoke the reducer to manipulate the store 
                             store.dispatch(incrementByAmount(3000))//or
                             store.dispatch({type:incByAmt,payload:3000})
                             //it invoke the reducer  internally by passing the action.type and action.payload and state
                             //accountReducer(state = { amount: 1 }, action)
      // 5.accesss the state of store by
                            //1.store.getState()  return the store state 
                            //2.subscrice invoke its callback on every dispatch 
                             store.subscribe(() => {
                                  console.log(store.getState());
                              });
                    



// //////////////////////////////    WORKING OF REDUX 
//=======================without react 
//                                STORE    <manipulate by reducer>
//                                DISPATCH <internaly pass the action and it recieve in reducer>
//                                GETSTATE <it return the store state >
//======================with react 
//                      <Provider store={store}></App></Provider>   from react-redux to connect store state to react state
//                      dispatch=useDistatch()  hook from      react-redux <internaly pass the action and it recieve in reducer>
//                      useSelector(state=>state.account.amount)  hook from react-redux to access the store tate                                              





// ///////////////////////////  THANKS FOR WATCHING  >>>>>>.......
    



