// stack:first in, last out
typedef struct Stack
{
    int arr[10];
    int i;
}stack;


int isfull(stack st){
    size_t n = sizeof(st.arr)/sizeof(st.arr);
    if (st.i < n)
    {
        return 0;
    }
    else
    {
        return 1;
    }
}

int isempty(stack st){
    if (st.i == -1)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

stack push(stack st, int data){
    if (!isfull(st){
        st.i++;
        st.arr[st.i]=data;
    }
}

int pop(stack st){
    if (!isempty(st){
        st.i--;
        return st.arr[st.i+1];
    }
}

int main(viod){

    return 0;
}