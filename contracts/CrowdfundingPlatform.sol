pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CrowdfundingPlatform {
    struct Project {
        address creator;
        string name;
        string description;
        uint256 goal;
        uint256 currentAmount;
        uint256 deadline;
        uint256 currentMilestone;
        uint256 votesForNextMilestone;
        address tokenAddress;
    }

    struct Milestone {
        uint256 amount;
        bool released;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Milestone[]) public milestones;
    mapping(uint256 => mapping(address => bool)) public votes;
    uint256 public projectCount;
    
    event ProjectCreated(uint256 indexed projectId, address indexed creator);
    event ContributionMade(uint256 indexed projectId, address indexed contributor, uint256 amount);
    event MilestoneReached(uint256 indexed projectId, uint256 milestoneIndex);

    constructor() {}

    function createProject(
        string memory _name,
        string memory _description,
        uint256 _goal,
        uint256 _deadline,
        uint256[] memory _milestones
    ) external {
        require(_goal > 0, "Goal must be positive");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        // Create project token
        ProjectToken token = new ProjectToken(_name, string(abi.encodePacked(_name, "-TKN")));
        
        projects[projectCount] = Project({
            creator: msg.sender,
            name: _name,
            description: _description,
            goal: _goal,
            currentAmount: 0,
            deadline: _deadline,
            currentMilestone: 0,
            votesForNextMilestone: 0,
            tokenAddress: address(token)
        });

        // Add milestones
        for (uint256 i = 0; i < _milestones.length; i++) {
            milestones[projectCount].push(Milestone({
                amount: _milestones[i],
                released: false
            }));
        }

        emit ProjectCreated(projectCount, msg.sender);
        projectCount++;
    }

    function contribute(uint256 _projectId) external payable {
        Project storage project = projects[_projectId];
        require(block.timestamp < project.deadline, "Funding period ended");
        require(msg.value > 0, "Contribution must be positive");

        project.currentAmount += msg.value;
        ProjectToken(project.tokenAddress).mint(msg.sender, msg.value);

        emit ContributionMade(_projectId, msg.sender, msg.value);
    }

    function voteForNextMilestone(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(!votes[_projectId][msg.sender], "Already voted");
        require(ProjectToken(project.tokenAddress).balanceOf(msg.sender) > 0, "No tokens to vote");

        project.votesForNextMilestone++;
        votes[_projectId][msg.sender] = true;

        Milestone[] storage projectMilestones = milestones[_projectId];
        if (project.votesForNextMilestone >= (project.currentAmount / 2)) {
            require(project.currentMilestone < projectMilestones.length, "All milestones completed");
            
            Milestone storage current = projectMilestones[project.currentMilestone];
            require(project.currentAmount >= current.amount, "Milestone target not reached");
            
            payable(project.creator).transfer(current.amount);
            current.released = true;
            project.currentMilestone++;
            project.votesForNextMilestone = 0;

            emit MilestoneReached(_projectId, project.currentMilestone);
        }
    }

    function getMilestones(uint256 _projectId) external view returns (uint256[] memory) {
        Milestone[] storage ms = milestones[_projectId];
        uint256[] memory amounts = new uint256[](ms.length);
        for (uint256 i = 0; i < ms.length; i++) {
            amounts[i] = ms[i].amount;
        }
        return amounts;
    }

    function getProjectDetails(uint256 _projectId) external view returns (Project memory) {
        return projects[_projectId];
    }
}

contract ProjectToken is ERC20 {
    address public immutable platform;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        platform = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == platform, "Only platform can mint");
        _mint(to, amount);
    }
}