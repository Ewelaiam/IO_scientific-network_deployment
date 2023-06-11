export const fetchData = <T,>(url: string) => (
    setData: (data: T) => void,
    setLoading: (loading: boolean) => void,
    setError: (error: string) => void
) => {
    fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
        setError(response.statusText);
    }).then(data => {
        setData(data);
    })
        .catch((e) => {
            setError(e.errorMessage);
        }).finally(() => {
            setLoading(false);
        });
};

const genericQuery = (method: string) => <T,R,>(url: string, data: T) => (
    setData: (data: R) => void = () => {},
    setLoading: (loading: boolean) => void = () => {},
    setError: (error: string) => void = () => {}
) => {
    fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    }).then((response) => {
        if(response.ok) {
            return response.json();
        }
        setError(response.statusText);
    }).then(data =>{
        setData(data);
    })
    .catch((e) => {
        setError(e.errorMessage);
    }).finally(() => {
        setLoading(false);
    });
}

export const postData = genericQuery('POST');
export const putData = genericQuery('PUT');
export const deleteData = genericQuery('DELETE');
