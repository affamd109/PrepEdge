export default async function CoverLetter({params} : {params : {id : String}} ){
    //Whenver we are passing props like this , u always have to write the type of the params, as we are using typescript , otherwise u will get an error
    const id =  params.id;


    return (
        <div>

            <h1> Cover letter ID : {id} </h1>
        </div>
    )
}

//This page only renders /interview