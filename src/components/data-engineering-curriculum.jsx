import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const instructorLedWeeks = [
  {
    week: "Week 1",
    title: "Onboarding and Environment Setup",
    month: "Month 1: Foundations of Data Engineering",
    objectives: [
      "Understand data engineering career pathways, course expectations, and delivery rhythm.",
      "Set up the development environment for Python, SQL, Git, Docker, and cloud labs.",
    ],
    concepts: [
      "Monday: Onboarding, course overview, career pathways, Git/GitHub, VS Code, and terminal workflow.",
      "Tuesday: Introduction to cloud computing across Azure, AWS, and GCP.",
      "Wednesday: Data governance, security, compliance, IAM, secrets, and access control.",
      "Thursday: SQL for data engineering and PostgreSQL setup.",
      "Friday: Peer project — environment setup challenges and troubleshooting.",
      "Saturday lab: Build a starter pipeline with PostgreSQL and Azure Blob Storage/S3-compatible storage.",
    ],
    project: "Cloud-ready development environment plus a basic PostgreSQL-to-object-storage pipeline.",
    tools: "Python, Git/GitHub, VS Code, PostgreSQL, Docker, Azure Blob Storage, AWS S3, GCP Cloud Storage",
  },
  {
    week: "Week 2",
    title: "SQL Essentials for Data Engineering",
    month: "Month 1: Foundations of Data Engineering",
    objectives: [
      "Write reliable analytical SQL for source exploration and pipeline outputs.",
      "Design SQL models that support reporting, downstream transformations, and performance.",
    ],
    concepts: [
      "Monday: SELECT, WHERE, JOIN, GROUP BY, HAVING, CASE, and clean query structure.",
      "Tuesday: Recursive queries, window functions, views, stored procedures, subqueries, and CTEs.",
      "Wednesday: Query optimization, indexes, partitions, and execution plans.",
      "Thursday: Data modeling with normalization, denormalization, star schemas, and slowly changing dimensions.",
      "Friday: Job shadowing — observe senior engineers writing and optimizing production SQL.",
      "Saturday lab: Create a star schema and analyze data using SQL.",
    ],
    project: "Retail analytics star schema with optimized SQL queries and documented assumptions.",
    tools: "PostgreSQL, DBeaver/pgAdmin, SQLFluff, dbdiagram, Git",
  },
  {
    week: "Week 3",
    title: "Introduction to Data Pipelines",
    month: "Month 1: Foundations of Data Engineering",
    objectives: [
      "Explain ETL, ELT, ingestion, transformation, and loading patterns.",
      "Build maintainable Python pipelines for batch files and APIs.",
    ],
    concepts: [
      "Monday: ETL/ELT workflow theory, batch ingestion, idempotency, and pipeline contracts.",
      "Tuesday: Build a simple Python ETL pipeline for CSV data.",
      "Wednesday: Extract, transform, load best practices, logging, configs, and error handling.",
      "Thursday: Build a Python ETL pipeline for batch processing with tests and validation.",
      "Friday: Peer project — design a basic ETL workflow as a team.",
      "Saturday lab: Develop a sales-data ETL pipeline with quality checks.",
    ],
    project: "Sales data ETL with automated cleaning, validation, logging, and reproducible outputs.",
    tools: "Python, Pandas, Requests, pytest, Great Expectations, Pandera, pre-commit, Makefile",
  },
  {
    week: "Week 4",
    title: "Introduction to Apache Airflow",
    month: "Month 1: Foundations of Data Engineering",
    objectives: [
      "Author and schedule basic Airflow DAGs.",
      "Orchestrate PostgreSQL, Python, and cloud-storage tasks reliably.",
    ],
    concepts: [
      "Monday: Apache Airflow concepts, DAGs, tasks, scheduling, retries, and operators.",
      "Tuesday: Set up Airflow locally and create a starter DAG.",
      "Wednesday: DAG best practices, backfills, dependency design, SLAs, and retries.",
      "Thursday: Integrate Airflow with PostgreSQL and Azure Blob Storage/S3.",
      "Friday: Job shadowing — observe real-world Airflow pipelines and runbooks.",
      "Saturday lab: Automate a batch ETL pipeline with Airflow.",
    ],
    project: "Airflow-orchestrated ingestion → validation → transform → publish workflow.",
    tools: "Apache Airflow, Docker Compose, PostgreSQL, Azure Blob Storage, AWS S3, Astronomer CLI basics",
  },
  {
    week: "Week 5",
    title: "Data Warehousing and Data Lakes",
    month: "Month 2: Intermediate Tools and Concepts",
    objectives: [
      "Compare warehouses, data lakes, and lakehouse architectures.",
      "Design analytical storage for raw, curated, and serving layers.",
    ],
    concepts: [
      "Monday: OLTP vs OLAP, partitioning, clustering, marts, and warehouse design.",
      "Tuesday: Work with Redshift/Snowflake/BigQuery/Synapse patterns for warehousing.",
      "Wednesday: Data lakes, lakehouse architecture, bronze/silver/gold, and open table formats.",
      "Thursday: Set up Delta Lake for raw and curated data.",
      "Friday: Peer project — implement a warehouse model and data lake for sales data.",
      "Saturday lab: Design and implement a basic lakehouse architecture.",
    ],
    project: "Sales lakehouse with raw, cleaned, and analytics-ready layers.",
    tools: "Snowflake, Amazon Redshift, BigQuery, Azure Synapse, Delta Lake, Apache Iceberg, Parquet, MinIO",
  },
  {
    week: "Week 6",
    title: "Data Governance and Security",
    month: "Month 2: Intermediate Tools and Concepts",
    objectives: [
      "Apply governance, privacy, and compliance controls to data platforms.",
      "Secure object storage, warehouses, secrets, and access policies.",
    ],
    concepts: [
      "Monday: Governance frameworks, stewardship, cataloging, lineage, and security principles.",
      "Tuesday: AWS Lake Formation and IAM-based access control.",
      "Wednesday: Sensitive data handling, PII, GDPR, HIPAA, retention, and masking.",
      "Thursday: Implement security policies in S3 and Azure Blob Storage.",
      "Friday: Job shadowing — observe governance policies in production workflows.",
      "Saturday lab: Secure cloud data with access controls, validation, and audit notes.",
    ],
    project: "Secure cloud data zone with documented roles, policies, and quality gates.",
    tools: "AWS Lake Formation, AWS IAM, Azure RBAC, Azure Key Vault, AWS Secrets Manager, OpenMetadata/DataHub basics",
  },
  {
    week: "Week 7",
    title: "Real-Time Data Processing with Kafka",
    month: "Month 2: Intermediate Tools and Concepts",
    objectives: [
      "Build producer/consumer applications and reason about event-driven systems.",
      "Design Kafka topics, partitions, schemas, retention, and replay strategies.",
    ],
    concepts: [
      "Monday: Introduction to Apache Kafka for real-time data streaming.",
      "Tuesday: Set up a Kafka producer and consumer.",
      "Wednesday: Kafka topics, partitions, brokers, consumer groups, schemas, and message design.",
      "Thursday: Integrate Kafka with PostgreSQL for real-time updates.",
      "Friday: Peer project — build a real-time Kafka pipeline for transactional data.",
      "Saturday lab: Stream e-commerce events and land them for analytics.",
    ],
    project: "E-commerce event stream with producer, consumer, schema strategy, and replay notes.",
    tools: "Apache Kafka, Kafka UI, Redpanda, Confluent Schema Registry, Python producers/consumers, PostgreSQL",
  },
  {
    week: "Week 8",
    title: "Batch vs. Stream Processing",
    month: "Month 2: Intermediate Tools and Concepts",
    objectives: [
      "Choose batch, streaming, or hybrid architectures based on product requirements.",
      "Implement batch and real-time workflows with scalable processing tools.",
    ],
    concepts: [
      "Monday: Batch vs stream processing, latency, throughput, windows, and delivery semantics.",
      "Tuesday: Batch processing with PySpark.",
      "Wednesday: Combining batch and stream processing workflows.",
      "Thursday: Real-time processing with Apache Flink and Spark Structured Streaming.",
      "Friday: Job shadowing — observe a real-time processing pipeline.",
      "Saturday lab: Build a hybrid pipeline combining batch and real-time processing.",
    ],
    project: "Hybrid batch + streaming pipeline for operational KPIs.",
    tools: "PySpark, Spark Structured Streaming, Apache Flink, Kafka, Delta Lake, Docker Compose",
  },
  {
    week: "Week 9",
    title: "Machine Learning Integration in Data Pipelines",
    month: "Month 3: Advanced Data Engineering",
    objectives: [
      "Prepare ML-ready datasets through reproducible pipeline stages.",
      "Automate feature engineering and model scoring inside data workflows.",
    ],
    concepts: [
      "Monday: ML workflow overview for data engineers and feature-store concepts.",
      "Tuesday: Preprocess data for ML using Pandas and PySpark.",
      "Wednesday: Feature engineering, automated feature extraction, and training/serving data contracts.",
      "Thursday: Automate feature extraction using Apache Airflow.",
      "Friday: Peer project — build a pipeline that integrates ML model outputs.",
      "Saturday lab: Build an ML-powered recommendation pipeline.",
    ],
    project: "Recommendation-system pipeline with feature generation, validation, and scheduled scoring.",
    tools: "Pandas, PySpark, scikit-learn, MLflow basics, Airflow, Feast feature-store concepts",
  },
  {
    week: "Week 10",
    title: "Spark and PySpark for Big Data",
    month: "Month 3: Advanced Data Engineering",
    objectives: [
      "Process larger datasets with Spark DataFrames and Spark SQL.",
      "Optimize Spark jobs for partitioning, joins, caching, and shuffle behavior.",
    ],
    concepts: [
      "Monday: Apache Spark architecture for big data processing.",
      "Tuesday: Set up Spark and PySpark for data analysis.",
      "Wednesday: Spark RDDs, DataFrames, Spark SQL, performance optimization, and tuning.",
      "Thursday: Analyze large datasets using Spark SQL.",
      "Friday: Peer project — build a PySpark pipeline for large-scale processing.",
      "Saturday lab: Analyze big datasets with Spark and PySpark.",
    ],
    project: "Large-scale analytics job with Spark SQL, partitioning, and performance notes.",
    tools: "Apache Spark, PySpark, Spark SQL, Databricks Community/Local Spark, Parquet, Delta Lake",
  },
  {
    week: "Week 11",
    title: "Advanced Apache Airflow Techniques",
    month: "Month 3: Advanced Data Engineering",
    objectives: [
      "Build dynamic, testable, and observable Airflow DAGs.",
      "Operate workflows with clear monitoring, alerting, and recovery patterns.",
    ],
    concepts: [
      "Monday: Advanced Airflow features including XCom, TaskFlow, branching, and task dependencies.",
      "Tuesday: Implement dynamic DAGs and task groups.",
      "Wednesday: Scheduling, monitoring, error handling, callbacks, and incident playbooks.",
      "Thursday: Create complex DAGs for multi-step ETL pipelines.",
      "Friday: Job shadowing — observe advanced Airflow pipeline implementations.",
      "Saturday lab: Design an advanced Airflow DAG for complex workflows.",
    ],
    project: "Production-style Airflow DAG with dynamic tasks, quality gates, notifications, and retries.",
    tools: "Apache Airflow, Astronomer, Docker, Slack/email alerts, Great Expectations, pytest",
  },
  {
    week: "Week 12",
    title: "Data Lakes and Delta Lake",
    month: "Month 3: Advanced Data Engineering",
    objectives: [
      "Design scalable lakehouse tables with schema evolution and time travel.",
      "Load batch and streaming data into trusted Delta Lake layers.",
    ],
    concepts: [
      "Monday: Data lakes, lakehouses, Delta Lake architecture, and transaction logs.",
      "Tuesday: Set up Delta Lake on AWS or Azure for storage and management.",
      "Wednesday: Manage schema evolution, compaction, time travel, and table optimization.",
      "Thursday: Implement batch and real-time loading to Delta Lake.",
      "Friday: Peer project — design a lakehouse architecture for an e-commerce platform.",
      "Saturday lab: Implement a scalable Delta Lake architecture.",
    ],
    project: "E-commerce lakehouse with Delta tables, schema evolution, and optimized reads.",
    tools: "Delta Lake, Apache Iceberg concepts, Spark, AWS S3, Azure Data Lake Storage, Databricks concepts",
  },
  {
    week: "Week 13",
    title: "Batch Data Pipeline Development",
    month: "Month 4: Capstone Projects",
    objectives: [
      "Build an end-to-end batch data pipeline for analytics use cases.",
      "Package, test, document, and deploy pipeline components like a production project.",
    ],
    concepts: [
      "Monday to Thursday: Design and implement an end-to-end batch pipeline for e-commerce sales analytics.",
      "Focus areas: ingestion, validation, transformation, orchestration, documentation, and reproducibility.",
      "Friday: Peer review — present progress and receive feedback.",
      "Saturday lab: Finalize and present batch pipeline results.",
    ],
    project: "End-to-end e-commerce sales analytics batch pipeline.",
    tools: "PySpark, SQL, PostgreSQL, Airflow, S3, Docker, Great Expectations, GitHub Actions",
  },
  {
    week: "Week 14",
    title: "Real-Time Data Pipeline Development",
    month: "Month 4: Capstone Projects",
    objectives: [
      "Build an end-to-end real-time pipeline for monitoring and live analytics.",
      "Handle streaming state, schemas, windows, alerts, and dashboards.",
    ],
    concepts: [
      "Monday to Thursday: Design and implement a real-time data pipeline for IoT sensor monitoring.",
      "Focus areas: event ingestion, streaming transformations, stateful processing, storage, and alerts.",
      "Friday: Peer review — present progress and receive feedback.",
      "Saturday lab: Finalize and present real-time pipeline results.",
    ],
    project: "IoT sensor monitoring pipeline with real-time KPIs and alerting.",
    tools: "Kafka, Spark Structured Streaming, Apache Flink, S3, Delta Lake, Grafana, Prometheus, Loki",
  },
  {
    week: "Week 15",
    title: "Final Project Integration",
    month: "Month 4: Capstone Projects",
    objectives: [
      "Integrate batch and streaming systems into a complete data platform.",
      "Add transformations, tests, observability, CI/CD, and clear architecture documentation.",
    ],
    concepts: [
      "Monday to Thursday: Integrate batch and real-time pipelines into one end-to-end solution.",
      "Focus areas: dbt transformations, data contracts, tests, Dockerized services, dashboards, and CI/CD.",
      "Friday: Job shadowing — observe senior engineers integrating complex pipelines.",
      "Saturday lab: Showcase the integrated solution for technical review.",
    ],
    project: "Integrated data platform combining batch, streaming, transformation, monitoring, and documentation.",
    tools: "Kafka, PySpark, Airflow, Delta Lake, PostgreSQL, S3, dbt, Docker, Great Expectations, Grafana, GitHub Actions",
  },
  {
    week: "Week 16",
    title: "Capstone Project Presentation",
    month: "Month 4: Capstone Projects",
    objectives: [
      "Polish, test, document, and present a production-style data engineering capstone.",
      "Defend architecture decisions, trade-offs, reliability controls, and business outcomes.",
    ],
    concepts: [
      "Monday to Thursday: Final presentation preparation, testing, documentation, and portfolio publishing.",
      "Focus areas: README, architecture diagram, runbook, data dictionary, data lineage, and deployment notes.",
      "Friday: Peer review — present final projects and receive feedback.",
      "Saturday lab: Capstone presentation to industry professionals and instructors.",
    ],
    project: "Final data engineering capstone with live demo, architecture defense, and portfolio repository.",
    tools: "GitHub, Docker Compose, Terraform basics, dbt docs, Great Expectations reports, Grafana dashboards, OpenLineage/Marquez basics",
  },
];

const coreToolStack = [
  "Languages: Python, SQL, Bash",
  "Databases and warehouses: PostgreSQL, Snowflake, Redshift, BigQuery, Azure Synapse",
  "Cloud and storage: Azure Blob Storage, Azure Data Lake Storage, AWS S3, GCP Cloud Storage, MinIO",
  "Orchestration: Apache Airflow, Astronomer, Dagster concepts",
  "Streaming and processing: Apache Kafka, Redpanda, Spark, PySpark, Spark Structured Streaming, Apache Flink",
  "Lakehouse and formats: Delta Lake, Apache Iceberg concepts, Parquet",
  "Transformation and quality: dbt, Great Expectations, Pandera, SQLFluff",
  "DevOps and observability: Docker, Docker Compose, GitHub Actions, Terraform basics, Grafana, Prometheus, Loki",
  "Governance and lineage: OpenMetadata/DataHub basics, OpenLineage/Marquez basics, IAM/RBAC, secrets management",
];

const portfolioArtifacts = [
  "SQL star schema and optimization case study",
  "Python ETL pipeline with validation and tests",
  "Dockerized data engineering application",
  "Airflow-orchestrated batch workflow",
  "Kafka streaming pipeline with schema strategy",
  "Spark/PySpark big-data processing project",
  "Delta Lake/lakehouse implementation",
  "dbt transformation project with tests, docs, and lineage",
  "Great Expectations data-quality reports",
  "Grafana monitoring stack with Prometheus/Loki alerts",
  "Final capstone repository with CI/CD, architecture diagrams, runbook, and live demo",
];

export default function DataEngineeringCurriculum() {
  return (
    <section className="mt-16" id="data-engineering-curriculum">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-50 text-center">
        LuxDevHQ Data Engineering Curriculum (4 Months / 16 Weeks)
      </h2>
      <p className="text-slate-300 text-center max-w-3xl mx-auto mb-10">
        This 4-month course equips learners with production-ready skills in Python, SQL,
        Azure, AWS, Docker, dbt, Great Expectations, Apache Airflow, Kafka, Spark,
        Grafana, and modern lakehouse workflows.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Program Design Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 16-week baseline delivered across 4 intensive months.</li>
              <li>• Monday to Thursday: theory, guided practice, and implementation.</li>
              <li>• Friday: job shadowing, peer project work, reviews, or technical demos.</li>
              <li>• Saturday: hands-on labs and project-based learning.</li>
              <li>• Portfolio-first delivery with production-style artifacts and capstone outputs.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Career Outcomes by Graduation</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Junior Data Engineer</li>
              <li>• Analytics Engineer (entry level)</li>
              <li>• BI/Data Pipeline Developer</li>
              <li>• Data Operations Engineer (entry level)</li>
              <li>• Ability to design, deploy, test, and monitor end-to-end data systems.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-600 bg-slate-900 mb-8">
        <CardHeader>
          <CardTitle className="text-blue-300">Week-by-Week Curriculum (Weeks 1-16)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {instructorLedWeeks.map((item) => (
              <AccordionItem value={item.week} key={item.week} className="border-slate-700">
                <AccordionTrigger className="text-left text-slate-100 hover:text-blue-300">
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-blue-300">{item.month}</span>
                    <span>{item.week} — {item.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-300 space-y-3">
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Learning objectives</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.objectives.map((objective) => (
                        <li key={objective}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-blue-200 mb-1">Weekly schedule</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {item.concepts.map((concept) => (
                        <li key={concept}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                  <p>
                    <span className="font-medium text-blue-200">Hands-on project:</span> {item.project}
                  </p>
                  <p>
                    <span className="font-medium text-blue-200">Tools/technologies:</span> {item.tools}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Expanded Tool Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              {coreToolStack.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-slate-600 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-blue-300">Delivery Rhythm</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• Monday to Thursday: instructor-led theory, demos, and implementation practice.</li>
              <li>• Friday: job shadowing with senior engineers, peer reviews, or project work.</li>
              <li>• Saturday: labs, mini projects, capstone milestones, and portfolio polishing.</li>
              <li>• Every month ends with a build review focused on reliability, documentation, and employability.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-600 bg-slate-900">
        <CardHeader>
          <CardTitle className="text-blue-300">Assessment and Portfolio Framework</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-300 space-y-3">
          <p>Weekly check-ins include labs, mini-quizzes, and code reviews with practical build assessments.</p>
          <p className="font-medium text-blue-200">Portfolio artifacts expected by Week 16:</p>
          <ul className="list-disc ml-5 space-y-1">
            {portfolioArtifacts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
