<?php

class template
{
/*
 * Title
 */
    
    function title(){
        return '
            <div class="container">
                <div class="lftColumn">
                    <div class="title">Title</div>
                </div>


                <div class="rgtColumn">
                    <p>
                        <span id="titleInterventions">
                            <span class="PlaceHolder">#######</span>
                        </span> 

                        <span class="givenText">vs</span>

                        <span id="titleComparisons">
                            <span class="PlaceHolder">#######</span>
                        </span> 

                        <span class="givenText">for</span>

                        <span id="titleOutcomes">
                            <span class="PlaceHolder">#######</span>
                        </span> 

                        <span class="givenText">: a systematic review of</span>

                        <span id="titleStudyType">
                            <span class="PlaceHolder">#######</span>
                        </span> 


                    </p>
                </div>        
            </div>
        ';
    }
    
    
    function objectives(){
        /*
        * Objectives
        */
        return '
            <!--Objectives-->
            <div class="container">
                <div class="lftColumn">
                    <div class="title">Objectives</div>
                </div>

                <div class="rgtColumn">
                <p>
                    <span class="givenText">to assess the effect on</span>

                    <span id="objectiveOutcome">
                        <span class="PlaceHolder">#######</span>
                    </span>

                    <span class="givenText">of</span> 

                    <span id="objectiveIntervention">
                        <span class="PlaceHolder">#######</span>
                    </span>

                    <span class="givenText">versus</span> 

                    <span id="objectiveComparison">
                        <span class="PlaceHolder">#######</span>
                    </span>

                    <span class="givenText">in</span> 

                    <span id="objectiveDisease">
                        <span class="PlaceHolder">#######</span>
                    </span>
                </div> 
                </p>
            </div>
        ';
    }   
    
    
    function informationSources(){
        /*
        * Information Sources
        */
        return '
            <div class="container">
                <div class="lftColumn">
                    <div class="title">Information Sources</div>
                </div>


                <div class="rgtColumn">

                    <p>       
                        <span class="givenText">We performed a literature search of </span>
                        <span id="informationSourcesStudyType" >
                            <span class="givenText dataToBeEnteredDirectly"> trials </span>
                        </span>
                        <span class="givenText">using</span>
                        <span class="givenText dataToBeEnteredDirectly"> Medline (January 1966 - December 2001)</span>
                        <span class="givenText "> ,we retrieved</span>
                        <span class="givenText dataToBeEnteredDirectly">Englsih- and non English language</span>
                        <span class="givenText ">articles for review.</span>
                        <span class="givenText ">We searched for</span> 
                        <span class="givenText dataToBeEnteredDirectly">both published and unpublished trials</span> 
                    </p>

                </div>        
            </div>';
    }    







 /*
 * Eligibility Criteria
 */
function eligibility_criteria(){ 
    return '   
    <!--eligibility_criteria-->
    <div class="container">
        <div class="lftColumn">
            <div class="title">Eligibility Criteria</div>
        </div>

        <div class="rgtColumn">
            <p>       

                <span class="givenText">We included </span> 
                <span id="eligibilityStudyType" > <span class="PlaceHolder"> ####### </span> </span>
                <span class="givenText dataToBeEnteredDirectly">testing</span>
                <span id="eligibilityIntervention" > <span class="PlaceHolder"> ####### </span> </span>
                <span class="givenText"> versus </span>
                <span id="eligibilityComparison" > <span class="PlaceHolder"> ####### </span> </span>
                <span class="givenText"> in </span>
                <span id="eligibilityDisease" > <span class="PlaceHolder"> ####### </span> </span>

            </p>       
        </div>        
    </div>
';
}

function risk_of_bias(){
return  '
    <!--Risk of Bias-->
    <div class="container">
        <div class="lftColumn">
            <div class="title">Risk of Bias</div>
        </div>
        

        <div class="rgtColumn">
            <p> 
                <span class="givenText">Risk of bias was assessed regarding </span>
                <span class="givenText dataToBeEnteredDirectly">randomisation, allocation concealment, blinding, incomplete outcome data, selective outcome reporting and other biases.</span> 
            </p>      
        </div>        
    </div>
';
}

function included_studies(){
return '
    <!--Included Studies-->
    <div class="container">
        <div class="lftColumn">
            <div class="title">Included Studies</div>
        </div>
        

        <div class="rgtColumn">
            <p>
                <span class="givenText">We included</span>
                <span class="givenText dataToBeEnteredDirectly">##number of trials##</span>
                <span class="givenText">trials involving</span>
                <span class="givenText dataToBeEnteredDirectly">##number of participants##</span>
                <span class="givenText">participants.</span>
                <span class="givenText dataToBeEnteredDirectly">##Give detailed description here##</span>     

            </p>       
        </div>        
    </div>';
}

function results(){
return '
    <!--Synthesis of results & Description of Effects-->
    <div class="container">
        <div class="lftColumn">
            <div class="title">Synthesis of results & Description of Effects</div>
        </div>
        

        <div class="rgtColumn">
            <p>
            <span id="results_effects" > <span class="PlaceHolder"> ####### </span> </span>   
            </p>
        </div>        
    </div>';
}

function strengthsAndLimits(){
/**
 *Strengths and Limitations 
 */
return '
    <div class="container">
        <div class="lftColumn">
            <div class="title">Strengths and Limitations</div>
        </div>
        

        <div class="rgtColumn">
            <p id="titleInterventions">
                 
            </p>        
        </div>        
    </div>';
}

function interpretation(){
/**
 *Interpretation
 */
return '
    <!--Interpretation-->
    <div class="container">
        <div class="lftColumn">
            <div class="title">Interpretation</div>
        </div>
        

        <div class="rgtColumn">
            <p id="titleInterventions">
                 
            </p>        
        </div>        
    </div>
';
}

/*
 * Funding
 */
function funding(){
    return '
    <!--Funding-->
    <div class="container">
        <div class="lftColumn">
            <div class="title">Funding</div>
        </div>
        

        <div class="rgtColumn">
            <p id="titleInterventions">
                 
            </p>        
        </div>        
    </div>
 ';
}

    /*
    * Registration
    */
    function registration(){ 
        return '
        <!--Registration-->
        <div class="container">
            <div class="lftColumn">
                <div class="title">Registration</div>
            </div>


            <div class="rgtColumn">
                <p id="titleInterventions">

                </p>        
            </div>        
        </div>

        ';
    }
    
    
}

$template= new template();
print   $template->eligibility_criteria().
        $template->objectives().
        $template->informationSources().
        $template->title().
        $template->risk_of_bias().
        $template->included_studies().
        $template->results().
        $template->strengthsAndLimits().
        $template->interpretation().
        $template->funding().
        $template->registration();

?>
