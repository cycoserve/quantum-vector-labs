# Project Scanning Instructions

## Purpose
This document provides instructions for coding agents on how to scan software projects and generate structured knowledge entries for The Leader Brain repository.

## Workflow Overview
1. **Project Analysis**: Examine the project structure, technologies, and implementation
2. **Knowledge Extraction**: Identify key information to document
3. **Template Application**: Fill out the entry template with extracted knowledge
4. **Entry Creation**: Save the completed entry to the knowledge/projects directory

## Step-by-Step Process

### Step 1: Initial Project Assessment
- Clone or access the target project repository
- Review README.md and any documentation files
- Identify the project's primary purpose and goals
- Note the project's technology stack from package.json, requirements.txt, or similar files

### Step 2: Technology Stack Documentation
Document each layer of the technology stack:
- **Frontend**: Check for frameworks (React, Vue, Angular, etc.), build tools, CSS methodologies
- **Backend**: Identify server languages/frameworks (Node.js, Python/Django, Ruby on Rails, etc.)
- **Database**: Note database types (SQL, NoSQL) and specific technologies used
- **Authentication**: Identify auth methods (JWT, OAuth, session-based, third-party providers)
- **Storage**: Document file storage solutions (local, cloud storage like S3, database storage)
- **Infrastructure**: Note deployment platforms (AWS, Heroku, Docker, Kubernetes, etc.)

### Step 3: Feature Identification
List all major features implemented in the project:
- User-facing features (authentication, profile management, etc.)
- Administrative features (content management, user administration, etc.)
- Integration features (payment processing, third-party APIs, etc.)
- System features (notifications, caching, logging, etc.)

### Step 4: Architectural Decision Analysis
Identify and document key architectural decisions:
- Monolith vs microservices vs serverless
- Choice of frontend framework and state management
- API design (REST, GraphQL, gRPC)
- Database modeling decisions
- Third-party service integrations
- Build/deployment pipeline choices

For each decision, document:
- What was decided
- Why it was chosen (requirements, constraints, preferences)
- Alternatives that were considered
- Outcome/results of the decision

### Step 5: Pattern Recognition
Identify successful patterns and practices:
- Code organization patterns that improved maintainability
- Reusable components or modules
- Effective testing strategies
- Performance optimization techniques
- Security implementation best practices
- Development workflow improvements

### Step 6: Mistake Documentation
Identify things that should not be repeated:
- Technical choices that caused problems
- Architectural decisions that created limitations
- Implementation approaches that led to bugs or maintenance issues
- Process failures that impacted timeline or quality
- For each mistake, document what happened, the impact, and lessons learned

### Step 7: Performance and Security Review
- Performance: Note any bottlenecks discovered and optimizations implemented
- Security: Document vulnerabilities found and how they were addressed, or effective security measures implemented

### Step 8: Deployment and Release Analysis
- Document deployment processes used
- Note what worked well in deployment/release processes
- Identify deployment challenges and how they were overcome
- Document rollback procedures and their effectiveness

### Step 9: Future Improvement Identification
Based on the project experience, identify:
- What would be done differently if starting over
- Technology choices that would be reconsidered
- Architectural changes that would improve the system
- Process improvements for future development

### Step 10: Template Completion and Entry Creation
- Use the entry-template.md as a guide
- Fill in all sections with the information gathered
- Ensure each section is complete and accurate
- Save the entry as a markdown file in knowledge/projects/
- Use a descriptive filename based on the project name (e.g., project-name.md)
- Include the generation date in the entry footer

## Entry Naming Convention
- Use lowercase letters, numbers, and hyphens only
- Base the filename on the project name
- Example: "e-commerce-platform.md" or "we-jus-chillin.md"
- Ensure the filename is unique within the knowledge/projects directory

## Quality Guidelines
- Be honest and objective in documentation
- Include both positive and negative experiences
- Provide specific details rather than vague statements
- Focus on actionable knowledge that others can learn from
- Keep explanations clear and concise
- Reference specific files, code patterns, or decisions when possible

## Example Entry Structure
After scanning a project, the resulting entry should follow this structure:
```
# Project Entry Template

## Project Overview
- **Project Name**: We-Jus-Chillin
- **Purpose**: A social media platform for sharing casual videos
- **Stack**: MERN (MongoDB, Express, React, Node.js)
- **Architecture Type**: Monolith with modular frontend

[... rest of sections filled in ...]

---
*Entry generated by The Leader Brain system*
*Date: 2026-03-12*
```

## Maintenance Notes
- These instructions may evolve as the Leader Brain system grows
- Coding agents should refer to the latest version of this document
- Feedback on improving the scanning process is encouraged